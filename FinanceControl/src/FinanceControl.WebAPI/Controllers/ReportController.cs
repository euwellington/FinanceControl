using FinanceControl.Models.Paramaters;
using FinanceControl.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;

namespace FinanceControl.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;
        private readonly IReportService _reportService;

        public ReportController(ILogger<ReportController> logger, IReportService reportService)
        {
            _logger = logger;
            _reportService = reportService;
        }

        /// <summary>
        /// Retorna totais de transações por pessoa com paginação.
        /// </summary>
        /// <remarks>
        /// Este endpoint retorna uma lista paginada de pessoas, cada uma contendo:
        /// - totalIncome: soma de todas as receitas da pessoa
        /// - totalExpense: soma de todas as despesas da pessoa
        /// - balance: saldo líquido (receita - despesa)
        ///
        /// Além disso, o JSON inclui os totais gerais de todas as pessoas, **independente da paginação**:
        /// - totalIncome: total de receitas de todas as pessoas
        /// - totalExpense: total de despesas de todas as pessoas
        /// - totalBalance: saldo líquido geral
        ///
        /// Parâmetros de consulta:
        /// - Page: número da página
        /// - PageSize: quantidade de registros por página
        ///
        /// Exemplo de resposta:
        /// {
        ///   "totalsByPerson": [
        ///     {
        ///       "personId": "7c9f8214-7ff0-4c72-8052-9b09275c30a3",
        ///       "name": "Francisco Wellington",
        ///       "totalIncome": 5902.5,
        ///       "totalExpense": 3000,
        ///       "balance": 2902.5
        ///     }
        ///   ],
        ///   "totalIncome": 12000,
        ///   "totalExpense": 8000,
        ///   "totalBalance": 4000,
        ///   "page": 1,
        ///   "pageSize": 10,
        ///   "totalRecords": 5
        /// }
        /// </remarks>
        [HttpGet("TransactionsPeople")]
        public async Task<IActionResult> GetTransactionsPeople([FromQuery] ReportTransactionPeopleModel request)
        {
            try
            {
                var pagedResult = await _reportService.GetTransactionsPeople(request);

                if (!pagedResult.Data.Any())
                    return NoContent();

                var (totalIncomeAll, totalExpenseAll) = await _reportService.GetTotalIncomeExpense();
                var totalBalanceAll = totalIncomeAll - totalExpenseAll;

                var responseWithTotals = new
                {
                    totalsByPerson = pagedResult.Data,   // lista paginada
                    totalIncome = totalIncomeAll,        // total geral de receitas
                    totalExpense = totalExpenseAll,      // total geral de despesas
                    totalBalance = totalBalanceAll,      // saldo líquido geral
                    page = pagedResult.Page,
                    pageSize = pagedResult.PageSize,
                    totalRecords = pagedResult.TotalRecords
                };

                return Ok(responseWithTotals);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTransactionsPeople");
                return StatusCode(500, "Erro interno ao gerar relatório.");
            }
        }

        /// <summary>
        /// Retorna totais de transações por categoria com paginação.
        /// </summary>
        /// <remarks>
        /// Este endpoint retorna uma lista paginada de categorias, cada uma contendo:
        /// - totalIncome: soma de todas as receitas na categoria
        /// - totalExpense: soma de todas as despesas na categoria
        /// - balance: saldo líquido (receita - despesa)
        ///
        /// Inclui também os totais gerais de todas as categorias, **independente da paginação**:
        /// - totalIncome: total de receitas de todas as categorias
        /// - totalExpense: total de despesas de todas as categorias
        /// - totalBalance: saldo líquido geral
        ///
        /// Parâmetros de consulta:
        /// - Page: número da página
        /// - PageSize: quantidade de registros por página
        ///
        /// Exemplo de resposta:
        /// {
        ///   "totalsByCategory": [
        ///     {
        ///       "categoryId": "521d74cf-c3fe-4bda-b072-563fb4fdbcf7",
        ///       "name": "Salário",
        ///       "totalIncome": 5000,
        ///       "totalExpense": 0,
        ///       "balance": 5000
        ///     }
        ///   ],
        ///   "totalIncome": 15000,
        ///   "totalExpense": 4000,
        ///   "totalBalance": 11000,
        ///   "page": 1,
        ///   "pageSize": 10,
        ///   "totalRecords": 4
        /// }
        /// </remarks>
        [HttpGet("TransactionsCategory")]
        public async Task<IActionResult> GetTransactionsCategory([FromQuery] ReportTransactionCategoryModel request)
        {
            try
            {
                var pagedResult = await _reportService.GetTransactionsCategory(request);

                if (!pagedResult.Data.Any())
                    return NoContent();

                var (totalIncomeAll, totalExpenseAll) = await _reportService.GetTotalIncomeExpenseByCategory();
                var totalBalanceAll = totalIncomeAll - totalExpenseAll;

                var responseWithTotals = new
                {
                    totalsByCategory = pagedResult.Data, // lista paginada
                    totalIncome = totalIncomeAll,        // total geral de receitas
                    totalExpense = totalExpenseAll,      // total geral de despesas
                    totalBalance = totalBalanceAll,      // saldo líquido geral
                    page = pagedResult.Page,
                    pageSize = pagedResult.PageSize,
                    totalRecords = pagedResult.TotalRecords
                };

                return Ok(responseWithTotals);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTransactionsCategory");
                return StatusCode(500, "Erro interno ao gerar relatório.");
            }
        }
    }
}
