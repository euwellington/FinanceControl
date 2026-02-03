using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Models.Enums;
using FinanceControl.Services.Interfaces;
using FinanceControl.WebAPI.RequestResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Authorize]
[Route("api/[controller]")]
[Produces("application/json")]
public class TransactionController : ControllerBase
{
    private readonly Response _response = new Response();
    private readonly IMapper _mapper;
    private readonly ILogger<TransactionController> _logger;
    private readonly ITransactionService _transactionService;

    public TransactionController(
        ILogger<TransactionController> logger,
        IMapper mapper,
        ITransactionService transactionService
    )
    {
        _logger = logger;
        _mapper = mapper;
        _transactionService = transactionService;
    }

    /// <summary>
    /// Recupera todas as transações financeiras com paginação.
    /// </summary>
    /// <remarks>
    /// Retorna uma lista paginada contendo todas as transações financeiras cadastradas no sistema.
    /// Cada transação inclui:
    /// - id: identificador único (GUID)
    /// - categoryId: GUID da categoria associada
    /// - personId: GUID da pessoa associada
    /// - description: descrição breve da transação
    /// - amount: valor da transação
    /// - type: Receita ou Despesa
    /// - createdAt: data e hora de criação da transação
    /// - updatedAt: data e hora da última atualização (null se nunca atualizada)
    /// 
    /// A paginação é aplicada usando os parâmetros de query `Page` e `PageSize`.
    /// Metadados da resposta incluem:
    /// - page: número da página atual
    /// - pageSize: quantidade de itens por página
    /// - totalRecords: total de transações
    /// - totalPages: total de páginas
    /// 
    /// Exemplo de resposta:
    /// {
    ///   "page": 1,
    ///   "pageSize": 10,
    ///   "totalRecords": 5,
    ///   "totalPages": 1,
    ///   "data": [
    ///     {
    ///       "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    ///       "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///       "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///       "description": "Salário",
    ///       "amount": 5000,
    ///       "type": "Income",
    ///       "createdAt": "2026-02-03T12:39:22",
    ///       "updatedAt": null
    ///     }
    ///   ]
    /// }
    /// </remarks>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] TransactionModel filter)
    {
        var result = await _transactionService.GetAll(filter);

        if (!result.Data.Any()) return NoContent();

        var mappedData = _mapper.Map<IEnumerable<TransactionResponse>>(result.Data);

        var response = new PagedResponse<TransactionResponse>().ResponseSuccess(
            result.Message,
            mappedData,
            result.TotalRecords,
            result.Page,
            result.PageSize
        );

        return Ok(response);
    }

    /// <summary>
    /// Recupera uma transação pelo seu identificador único.
    /// </summary>
    /// <param name="id">Identificador único (GUID) da transação</param>
    /// <remarks>
    /// Retorna os detalhes de uma transação financeira específica.
    /// Se a transação não existir, retorna HTTP 204 No Content.
    /// Campos da resposta:
    /// - id, categoryId, personId, description, amount, type, createdAt, updatedAt
    /// 
    /// Exemplo de resposta:
    /// {
    ///   "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    ///   "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///   "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///   "description": "Salário",
    ///   "amount": 5000,
    ///   "type": "Income",
    ///   "createdAt": "2026-02-03T12:39:22",
    ///   "updatedAt": null
    /// }
    /// </remarks>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var transaction = await _transactionService.GetById(id);
        if (transaction == null) return NoContent();

        var mappedData = _mapper.Map<TransactionResponse>(transaction);
        return Ok(_response.ResponseSuccess("Transação recuperada com sucesso", mappedData));
    }

    /// <summary>
    /// Cria uma nova transação financeira.
    /// </summary>
    /// <param name="request">Dados da transação a ser criada</param>
    /// <remarks>
    /// Cria um novo registro de transação no sistema.
    /// Campos obrigatórios:
    /// - categoryId
    /// - personId
    /// - description
    /// - amount
    /// - type (Receita ou Despesa)
    /// 
    /// Retorna a transação criada com GUID e timestamps.
    /// Exemplo de requisição:
    /// {
    ///   "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///   "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///   "description": "Projeto Freelance",
    ///   "amount": 1200,
    ///   "type": "Income"
    /// }
    /// </remarks>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TransactionRequest request)
    {
        var transaction = _mapper.Map<Transaction>(request);
        var response = await _transactionService.Insert(transaction);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Atualiza uma transação existente.
    /// </summary>
    /// <param name="request">Dados da transação a serem atualizados</param>
    /// <remarks>
    /// Atualiza uma transação existente identificada pelo seu GUID.
    /// Campos que podem ser atualizados:
    /// - categoryId
    /// - personId
    /// - description
    /// - amount
    /// - type (Receita ou Despesa)
    /// 
    /// Exemplo de requisição:
    /// {
    ///   "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    ///   "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///   "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///   "description": "Projeto Freelance Atualizado",
    ///   "amount": 1300,
    ///   "type": "Income"
    /// }
    /// </remarks>
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] TransactionUpdateRequest request)
    {
        var transaction = _mapper.Map<Transaction>(request);
        var response = await _transactionService.Update(transaction);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Exclui uma transação pelo GUID.
    /// </summary>
    /// <param name="id">Identificador único da transação</param>
    /// <remarks>
    /// Remove uma transação do sistema.
    /// Se a transação não existir, retorna 400 Bad Request.
    /// Exemplos de resposta:
    /// - 200 OK: Transação excluída com sucesso
    /// - 400 Bad Request: Ocorreu erro, como transação não encontrada
    /// </remarks>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _transactionService.Delete(id);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }
}
