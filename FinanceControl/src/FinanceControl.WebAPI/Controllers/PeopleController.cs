using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Services.Interfaces;
using FinanceControl.WebAPI.RequestResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceControl.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class PeopleController : ControllerBase
{
    private readonly Response _response = new Response();
    private readonly IMapper _mapper;
    private readonly ILogger<PeopleController> _logger;
    private readonly IPeopleService _peopleService;

    public PeopleController(
        ILogger<PeopleController> logger,
        IMapper mapper,
        IPeopleService peopleService
    )
    {
        _logger = logger;
        _mapper = mapper;
        _peopleService = peopleService;
    }

    /// <summary>
    /// Recupera todas as pessoas com paginação.
    /// </summary>
    /// <remarks>
    /// Retorna uma lista paginada contendo todas as pessoas cadastradas no sistema.
    /// Cada pessoa inclui:
    /// - id: identificador único (GUID)
    /// - name: nome completo da pessoa
    /// - age: idade em anos
    /// - email: endereço de e-mail
    /// - lastLogin: data e hora do último login
    /// - lastLogout: data e hora do último logout
    /// - createdAt: data e hora de criação do registro
    /// - updatedAt: data e hora da última atualização (null se nunca atualizado)
    /// 
    /// A paginação é aplicada usando os parâmetros de query `Page` e `PageSize`.
    /// A resposta inclui metadados sobre a paginação:
    /// - page: número da página atual
    /// - pageSize: quantidade de itens por página
    /// - totalRecords: total de pessoas no sistema
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
    ///       "id": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///       "name": "Francisco Wellington De Abreu Felipe",
    ///       "age": 35,
    ///       "email": "francisco@example.com",
    ///       "lastLogin": "2026-02-03T12:39:22",
    ///       "lastLogout": "2026-02-03T18:45:10",
    ///       "createdAt": "2026-02-03T12:00:00",
    ///       "updatedAt": null
    ///     }
    ///   ]
    /// }
    /// </remarks>
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PeopleModel filter)
    {
        var result = await _peopleService.GetAll(filter);

        if (!result.Data.Any()) return NoContent();

        var mappedData = _mapper.Map<IEnumerable<PeopleResponse>>(result.Data);

        var response = new PagedResponse<PeopleResponse>().ResponseSuccess(
            result.Message,
            mappedData,
            result.TotalRecords,
            result.Page,
            result.PageSize
        );

        return Ok(response);
    }

    /// <summary>
    /// Recupera uma pessoa específica pelo GUID.
    /// </summary>
    /// <param name="id">Identificador único da pessoa</param>
    /// <remarks>
    /// Retorna os detalhes de uma pessoa específica.
    /// Se a pessoa não existir, retorna HTTP 204 No Content.
    /// A resposta inclui:
    /// - id, name, age, email, lastLogin, lastLogout, createdAt, updatedAt
    /// 
    /// Exemplo de resposta:
    /// {
    ///   "id": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///   "name": "Francisco Wellington De Abreu Felipe",
    ///   "age": 35,
    ///   "email": "francisco@example.com",
    ///   "lastLogin": "2026-02-03T12:39:22",
    ///   "lastLogout": "2026-02-03T18:45:10",
    ///   "createdAt": "2026-02-03T12:00:00",
    ///   "updatedAt": null
    /// }
    /// </remarks>
    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var person = await _peopleService.GetById(id);
        if (person == null) return NoContent();

        var mappedData = _mapper.Map<PeopleResponse>(person);
        return Ok(_response.ResponseSuccess("Pessoa recuperada com sucesso", mappedData));
    }

    /// <summary>
    /// Cria o primeiro usuário do sistema (registro público, sem necessidade de login).
    /// </summary>
    /// <param name="request">Dados da pessoa a ser criada</param>
    /// <remarks>
    /// Este endpoint é usado apenas para cadastrar os **primeiros usuários** do sistema.
    /// Ele é **aberto** e **não exige token JWT** nem autenticação.
    /// 
    /// Campos obrigatórios:
    /// - name: nome completo da pessoa
    /// - age: idade
    /// - email: e-mail válido
    /// - password: senha (será armazenada criptografada em MD5 no banco de dados)
    ///
    /// Em caso de sucesso, retorna a pessoa criada com GUID e timestamps.
    ///
    /// Exemplo de requisição:
    /// {
    ///   "name": "Maria Silva",
    ///   "age": 28,
    ///   "email": "maria.silva@example.com",
    ///   "password": "minhaSenha123"
    /// }
    /// </remarks>
    [HttpPost("first/register")]
    public async Task<IActionResult> FirstRegister([FromBody] PeopleRequest request)
    {
        var person = _mapper.Map<People>(request);
        var response = await _peopleService.Insert(person);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Cria uma nova pessoa no sistema (registro autenticado, token JWT opcional).
    /// </summary>
    /// <param name="request">Dados da pessoa a ser criada</param>
    /// <remarks>
    /// Este endpoint é usado para criar usuários adicionais após o primeiro registro.
    /// Requer **autenticação JWT** para associar o usuário criador, mas caso não haja token,
    /// o cadastro ainda é permitido, retornando `Guid.Empty` como ID do usuário.
    /// 
    /// Campos obrigatórios:
    /// - name: nome completo da pessoa
    /// - age: idade
    /// - email: e-mail válido
    /// - password: senha (será armazenada criptografada em MD5 no banco de dados)
    ///
    /// Em caso de sucesso, retorna a pessoa criada com GUID e timestamps.
    /// </remarks>
    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PeopleRequest request)
    {
        var person = _mapper.Map<People>(request);
        var response = await _peopleService.Insert(person);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Atualiza uma pessoa existente.
    /// </summary>
    /// <param name="request">Dados da pessoa a serem atualizados</param>
    /// <remarks>
    /// Atualiza uma pessoa existente identificada pelo GUID.
    /// Campos que podem ser atualizados:
    /// - name
    /// - age
    /// - email
    /// 
    /// Se a pessoa não existir, retorna 400 Bad Request.
    /// Exemplo de requisição:
    /// {
    ///   "id": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///   "name": "Maria Silva Atualizada",
    ///   "age": 29,
    ///   "email": "maria.updated@example.com"
    /// }
    /// </remarks>
    [Authorize]
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] PeopleUpdateRequest request)
    {
        var person = _mapper.Map<People>(request);
        var response = await _peopleService.Update(person);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }

    /// <summary>
    /// Exclui uma pessoa pelo GUID.
    /// </summary>
    /// <param name="id">Identificador único da pessoa</param>
    /// <remarks>
    /// Remove uma pessoa do sistema.
    /// Se a pessoa tiver transações associadas, a exclusão pode falhar dependendo das regras de negócio.
    /// Possíveis respostas:
    /// - 200 OK: Pessoa excluída com sucesso
    /// - 400 Bad Request: Ocorreu erro, como pessoa não encontrada ou transações vinculadas
    /// </remarks>
    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _peopleService.Delete(id);
        if (response.Error) return BadRequest(response);

        return Ok(response);
    }
}
