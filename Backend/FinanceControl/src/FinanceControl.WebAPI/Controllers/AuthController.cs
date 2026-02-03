using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Services.Interfaces;
using FinanceControl.WebAPI.RequestResponse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinanceControl.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class AuthController : ControllerBase
{
    private readonly Response response = new Response();
    private readonly IMapper _mapper;
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(
        ILogger<AuthController> logger,
        IMapper mapper,
        IAuthService authService
        )
    {
        _logger = logger;
        _mapper = mapper;
        _authService = authService;
    }

    /// <summary>
    /// Autentica um usuário usando e-mail e senha.
    /// Este endpoint verifica as credenciais fornecidas com os dados de usuário armazenados.
    /// </summary>
    /// <remarks>
    /// Valida as credenciais do usuário e retorna um token de autenticação.
    /// 
    /// O processo de autenticação inclui:
    /// 1. Validar se o e-mail e a senha foram fornecidos e estão no formato correto.
    /// 2. Verificar se o usuário existe no banco de dados.
    /// 3. Confirmar se o hash da senha corresponde ao hash armazenado.
    /// 4. Gerar um token JWT caso a autenticação seja bem-sucedida.
    ///
    /// O token JWT retornado pode ser usado no cabeçalho Authorization para solicitações
    /// subsequentes a endpoints protegidos.
    ///
    /// Possíveis respostas:
    /// - 200 OK: Autenticação bem-sucedida, retorna um objeto JSON com o token JWT e informações do usuário.
    /// - 400 Bad Request: E-mail ou senha ausentes ou em formato inválido.
    /// - 401 Unauthorized: E-mail ou senha incorretos.
    /// - 500 Internal Server Error: Erro inesperado durante a autenticação.
    ///
    /// Exemplo de requisição:
    /// {
    ///     "email": "usuario@exemplo.com",
    ///     "password": "senhaSegura123"
    /// }
    ///
    /// Exemplo de resposta bem-sucedida:
    /// {
    ///     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    ///     "userId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
    ///     "email": "usuario@exemplo.com",
    ///     "expiresIn": 3600
    /// }
    /// </remarks>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Auth request)
    {
        var auth = await _authService.ValidationUser(request);
        if (auth.Error) return Unauthorized(auth);
        return Ok(auth);
    }

    ///// <summary>
    ///// Atualiza o token de autenticação
    ///// </summary>
    ///// <remarks>
    ///// Gera um novo token de acesso usando um token de atualização válido.
    ///// </remarks>
    //[Authorize]
    //[HttpPost("logout")]
    //public IActionResult Logout()
    //{
    //    return Ok(response.ResponseSuccess<object>("Logout realizado com sucesso"));
    //}
}
