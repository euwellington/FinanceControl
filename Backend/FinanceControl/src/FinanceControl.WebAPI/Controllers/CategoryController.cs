using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Services.Interfaces;
using FinanceControl.WebAPI.RequestResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Authorize]
[Route("api/[controller]")]
[Produces("application/json")]
public class CategoryController : ControllerBase
{
    private readonly Response _response = new Response();
    private readonly IMapper _mapper;
    private readonly ILogger<CategoryController> _logger;
    private readonly ICategoryService _categoryService;

    public CategoryController(
        ILogger<CategoryController> logger,
        IMapper mapper,
        ICategoryService categoryService
    )
    {
        _logger = logger;
        _mapper = mapper;
        _categoryService = categoryService;
    }

    /// <summary>
    /// Recupera todas as categorias com paginação.
    /// </summary>
    /// <remarks>
    /// Retorna uma lista paginada contendo todas as categorias cadastradas no sistema.
    /// Cada categoria inclui seu identificador único (GUID), descrição, finalidade (Receita ou Despesa),
    /// data de criação e data da última atualização (se houver).
    /// 
    /// Os parâmetros de paginação podem ser passados na query string usando os campos `Page` e `PageSize`.
    /// A resposta também inclui metadados sobre a paginação:
    /// - page: número da página atual
    /// - pageSize: quantidade de itens por página
    /// - totalRecords: total de categorias no sistema
    /// - totalPages: total de páginas disponíveis
    /// 
    /// Exemplo de resposta:
    /// {
    ///   "page": 1,
    ///   "pageSize": 10,
    ///   "totalRecords": 4,
    ///   "totalPages": 1,
    ///   "data": [
    ///     {
    ///       "id": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///       "description": "Avião",
    ///       "purpose": "Income",
    ///       "createdAt": "2026-02-03T12:39:22",
    ///       "updatedAt": null
    ///     }
    ///   ]
    /// }
    /// </remarks>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] CategoryModel filter)
    {
        var result = await _categoryService.GetAll(filter);

        if (!result.Data.Any()) return NoContent();

        var mappedData = _mapper.Map<IEnumerable<CategoryResponse>>(result.Data);

        var response = new PagedResponse<CategoryResponse>().ResponseSuccess(
            result.Message,
            mappedData,
            result.TotalRecords,
            result.Page,
            result.PageSize
        );

        return Ok(response);
    }

    /// <summary>
    /// Recupera uma categoria pelo seu identificador único (GUID).
    /// </summary>
    /// <param name="id">O GUID da categoria a ser recuperada.</param>
    /// <remarks>
    /// Retorna os detalhes de uma categoria específica.
    /// Se a categoria não existir, o endpoint retorna HTTP 204 No Content.
    /// A resposta inclui:
    /// - id: identificador único da categoria
    /// - description: descrição textual da categoria
    /// - purpose: finalidade da categoria (Receita ou Despesa)
    /// - createdAt: data e hora de criação da categoria
    /// - updatedAt: data e hora da última atualização (null se nunca atualizada)
    /// 
    /// Exemplo de resposta:
    /// {
    ///   "id": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///   "description": "Avião",
    ///   "purpose": "Income",
    ///   "createdAt": "2026-02-03T12:39:22",
    ///   "updatedAt": null
    /// }
    /// </remarks>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var category = await _categoryService.GetById(id);
        if (category == null) return NoContent();

        var mappedData = _mapper.Map<CategoryResponse>(category);
        return Ok(_response.ResponseSuccess("Categoria recuperada com sucesso", mappedData));
    }

    /// <summary>
    /// Cria uma nova categoria.
    /// </summary>
    /// <param name="request">Corpo da requisição contendo os dados da categoria a ser criada.</param>
    /// <remarks>
    /// Este endpoint cria um novo registro de categoria no sistema.
    /// Os campos obrigatórios são:
    /// - description: descrição textual da categoria
    /// - purpose: finalidade da categoria (Receita ou Despesa)
    /// 
    /// Em caso de sucesso, o endpoint retorna a categoria criada com seu GUID e timestamps.
    /// Possíveis respostas:
    /// - 200 OK: Categoria criada com sucesso
    /// - 400 Bad Request: Erros de validação ou dados faltantes
    /// 
    /// Exemplo de requisição:
    /// {
    ///   "description": "Avião",
    ///   "purpose": "Income"
    /// }
    /// </remarks>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryRequest request)
    {
        var category = _mapper.Map<Category>(request);
        var response = await _categoryService.Insert(category);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Atualiza uma categoria existente.
    /// </summary>
    /// <param name="request">Corpo da requisição contendo os dados atualizados da categoria.</param>
    /// <remarks>
    /// Atualiza uma categoria no sistema identificada pelo seu GUID.
    /// Os campos que podem ser atualizados incluem:
    /// - description
    /// - purpose (Receita ou Despesa)
    /// 
    /// Se a categoria não existir, retorna 400 Bad Request.
    /// Exemplo de requisição:
    /// {
    ///   "id": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
    ///   "description": "Avião atualizado",
    ///   "purpose": "Income"
    /// }
    /// </remarks>
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CategoryUpdateRequest request)
    {
        var category = _mapper.Map<Category>(request);
        var response = await _categoryService.Update(category);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Exclui uma categoria pelo GUID.
    /// </summary>
    /// <param name="id">O identificador único da categoria a ser excluída.</param>
    /// <remarks>
    /// Remove uma categoria do sistema.
    /// Se a categoria tiver transações vinculadas, a exclusão pode falhar dependendo das regras de negócio.
    /// Possíveis respostas:
    /// - 200 OK: Categoria excluída com sucesso
    /// - 400 Bad Request: Ocorreu erro, como categoria não encontrada ou transações vinculadas
    /// </remarks>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _categoryService.Delete(id);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }
}
