using AutoMapper;
using FinanceControl.Models.Entities;
using FinanceControl.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceControl.WebAPI.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
[Produces("application/json")]
public class DashboardController : ControllerBase
{
    private readonly ILogger<DashboardController> _logger;
    private readonly IDashboardService _dashboardService;

    public DashboardController(
        ILogger<DashboardController> logger,
        IMapper mapper,
        IDashboardService dashboardService
    )
    {
        _logger = logger;
        _dashboardService = dashboardService;
    }

    /// <summary>
    /// Fornece uma visão consolidada de 360 graus da saúde financeira e dados cadastrais.
    /// </summary>
    /// <remarks>
    /// Retorna um objeto de estatísticas globais que agrega dados das tabelas de transações, pessoas e categorias.
    /// 
    /// O objeto de resposta inclui:
    /// - **Contadores de Cadastro**: Totais ativos de pessoas, categorias e transações.
    /// - **Métricas Financeiras**: Soma de Receitas (Income), Despesas (Expense) e Saldo Líquido.
    /// - **Insights Demográficos**: Média de idade das pessoas vinculadas a transações.
    /// - **Histórico Recente**: Lista das últimas 10 transações cronológicas.
    /// 
    /// Cada item do histórico contém:
    /// - transactionDate: data e hora da ocorrência
    /// - amount: valor monetário
    /// - type: "Income" ou "Expense"
    /// - description: breve detalhamento do lançamento
    /// 
    /// Exemplo de resposta:
    /// {
    ///    "totalCategories": 8,
    ///    "totalPeople": 15,
    ///    "totalTransactions": 142,
    ///    "revenue": 12500.00,
    ///    "expenses": 4200.50,
    ///    "netBalance": 8299.50,
    ///    "avgAgeOfTransactingPeople": 29.5,
    ///    "isPositiveBalance": true,
    ///    "history": [
    ///      {
    ///        "transactionDate": "2026-02-04T15:30:00",
    ///        "amount": 150.00,
    ///        "type": "Expense",
    ///        "description": "Pagamento Internet"
    ///      }
    ///    ]
    /// }
    /// </remarks>
    /// <returns>Objeto contendo KPIs financeiros e lista de atividades recentes.</returns>
    /// <response code="200">Dados recuperados com sucesso.</response>
    /// <response code="401">Usuário não autenticado ou token inválido.</response>
    /// <response code="500">Erro interno no processamento dos indicadores financeiros.</response>
    [HttpGet]
    [ProducesResponseType(typeof(DashboardStats), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetDashboardData()
    {
        try
        {
            _logger.LogInformation("Iniciando compilação de dados para o Dashboard.");
            var data = await _dashboardService.GetDashboardStats();
            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao processar indicadores do Dashboard.");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Falha ao carregar indicadores financeiros.", error = ex.Message });
        }
    }
}