using Dapper;
using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Base;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Repositories.Scripts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories
{
    public class ReportRepository : BaseRepository, IReportRepository
    {
        private readonly ILogger _logger;

        public ReportRepository(
            MySqlConnection mySqlConnection,
            ILogger<ReportRepository> logger,
            IHttpContextAccessor httpContextAccessor) : base(mySqlConnection, logger, httpContextAccessor)
        {
            _logger = logger;
        }

        // Lista paginada por pessoa
        public async Task<PagedResponse<PersonTotal>> GetTransactionsPeople(ReportTransactionPeopleModel request)
        {
            try
            {
                var sql = new StringBuilder();
                var parameters = new DynamicParameters();

                sql.AppendLine(ReportScripts.SelectBasePeopleTransaction);

                parameters.Add("Income", "Income");
                parameters.Add("Expense", "Expense");

                var countSql = $"SELECT COUNT(1) FROM ({sql}) AS CountQuery";
                var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

                var offset = (request.Page - 1) * request.PageSize;
                parameters.Add("PageSize", request.PageSize);
                parameters.Add("Offset", offset);

                sql.AppendLine("ORDER BY p.CreatedAt DESC");
                sql.AppendLine("LIMIT @PageSize OFFSET @Offset");

                var transactionsPeople = (await _mySqlConnection.QueryAsync<PersonTotal>(sql.ToString(), parameters)).ToList();

                return new PagedResponse<PersonTotal>().ResponseSuccess(
                    "List loaded successfully",
                    transactionsPeople,
                    totalRecords,
                    request.Page,
                    request.PageSize
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTransactionsPeople");
                throw;
            }
        }

        // Totais gerais de todas as pessoas (independente de paginação)
        public async Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpense()
        {
            try
            {
                var sql = ReportScripts.SelectBaseTotalIncomeExpense;

                var totals = await _mySqlConnection.QueryFirstAsync<(decimal TotalIncome, decimal TotalExpense)>(sql);
                return totals;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTotalIncomeExpense");
                throw;
            }
        }

        // Lista paginada por categoria
        public async Task<PagedResponse<PersonTotal>> GetTransactionsCategory(ReportTransactionCategoryModel request)
        {
            try
            {
                var sql = new StringBuilder();
                var parameters = new DynamicParameters();

                sql.AppendLine(ReportScripts.SelectBaseCategoryTransaction);

                parameters.Add("Income", "Income");
                parameters.Add("Expense", "Expense");

                var countSql = $"SELECT COUNT(1) FROM ({sql}) AS CountQuery";
                var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

                var offset = (request.Page - 1) * request.PageSize;
                parameters.Add("PageSize", request.PageSize);
                parameters.Add("Offset", offset);

                sql.AppendLine("ORDER BY c.Name ASC");
                sql.AppendLine("LIMIT @PageSize OFFSET @Offset");

                var transactionsCategory = (await _mySqlConnection.QueryAsync<PersonTotal>(sql.ToString(), parameters)).ToList();

                return new PagedResponse<PersonTotal>().ResponseSuccess(
                    "List loaded successfully",
                    transactionsCategory,
                    totalRecords,
                    request.Page,
                    request.PageSize
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTransactionsCategory");
                throw;
            }
        }

        // Totais gerais de todas as categorias (independente de paginação)
        public async Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpenseByCategory()
        {
            try
            {
                var sql = ReportScripts.SelectBaseTotalIncomeExpenseCategory;

                var totals = await _mySqlConnection.QueryFirstAsync<(decimal TotalIncome, decimal TotalExpense)>(sql);
                return totals;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetTotalIncomeExpenseByCategory");
                throw;
            }
        }
    }
}
