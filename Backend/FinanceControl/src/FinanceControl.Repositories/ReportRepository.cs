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

        public async Task<PagedResponse<PersonTotal>> GetTransactionsPeople(ReportTransactionPeopleModel request)
        {
            try
            {
                var sql = new StringBuilder();
                var parameters = new DynamicParameters();

                var baseSql = ReportScripts.SelectBasePeopleTransaction;
                
                var filterSql = new StringBuilder();
                if (request.PeopleId.HasValue)
                    AddFilter(filterSql, parameters, request.PeopleId.Value, "p.Id = @PeopleId", "PeopleId");

                if (!string.IsNullOrEmpty(request.Name))
                    AddFilter(filterSql, parameters, $"%{request.Name}%", "p.Name LIKE @Name", "Name");

                var finalBaseSql = baseSql.Replace("WHERE p.DeletedAt IS NULL", $"WHERE p.DeletedAt IS NULL {filterSql}");

                parameters.Add("Income", "Income");
                parameters.Add("Expense", "Expense");

                var countSql = $"SELECT COUNT(1) FROM ({finalBaseSql}) AS CountQuery";
                var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

                var offset = (request.Page - 1) * request.PageSize;
                parameters.Add("PageSize", request.PageSize);
                parameters.Add("Offset", offset);

                var pagedSql = new StringBuilder(finalBaseSql);
                pagedSql.AppendLine("ORDER BY p.Name ASC");
                pagedSql.AppendLine("LIMIT @PageSize OFFSET @Offset");

                var transactionsPeople = (await _mySqlConnection.QueryAsync<PersonTotal>(pagedSql.ToString(), parameters)).ToList();

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

        public async Task<PagedResponse<CategoryTotal>> GetTransactionsCategory(ReportTransactionCategoryModel request)
        {
            try
            {
                var sql = new StringBuilder();
                var parameters = new DynamicParameters();

                var baseSql = ReportScripts.SelectBaseCategoryTransaction;

                var filterSql = new StringBuilder();
                if (request.CategoryId.HasValue)
                    AddFilter(filterSql, parameters, request.CategoryId.Value, "c.Id = @CategoryId", "CategoryId");

                if (!string.IsNullOrEmpty(request.Description))
                    AddFilter(filterSql, parameters, $"%{request.Description}%", "c.Description LIKE @Name", "Description");

                var finalBaseSql = baseSql.Replace("WHERE c.DeletedAt IS NULL", $"WHERE c.DeletedAt IS NULL {filterSql}");

                parameters.Add("Income", "Income");
                parameters.Add("Expense", "Expense");

                var countSql = $"SELECT COUNT(1) FROM ({finalBaseSql}) AS CountQuery";
                var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

                var offset = (request.Page - 1) * request.PageSize;
                parameters.Add("PageSize", request.PageSize);
                parameters.Add("Offset", offset);

                var pagedSql = new StringBuilder(finalBaseSql);
                pagedSql.AppendLine("ORDER BY c.Description ASC");
                pagedSql.AppendLine("LIMIT @PageSize OFFSET @Offset");

                var transactionsCategory = (await _mySqlConnection.QueryAsync<CategoryTotal>(pagedSql.ToString(), parameters)).ToList();

                return new PagedResponse<CategoryTotal>().ResponseSuccess(
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