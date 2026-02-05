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
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories;

public class TransactionRepository : BaseRepository, ITransactionRepository
{
    private readonly ILogger<TransactionRepository> _logger;

    public TransactionRepository(
        MySqlConnection mySqlConnection,
        ILogger<TransactionRepository> logger,
        IHttpContextAccessor httpContextAccessor
    ) : base(mySqlConnection, logger, httpContextAccessor)
    {
        _logger = logger;
    }

    public async Task<PagedResponse<Transaction>> GetAll(TransactionModel request)
    {
        try
        {
            var sqlBase = new StringBuilder();
            sqlBase.AppendLine(TransactionScripts.SelectBase);

            var parameters = new DynamicParameters();

            AddLikeFilter(sqlBase, parameters, request.Description, "AND t.Description LIKE @Description", "Description");
            AddFilter(sqlBase, parameters, request.PersonId, "AND t.PersonId = @PersonId", "PersonId");
            AddFilter(sqlBase, parameters, request.CategoryId, "AND t.CategoryId = @CategoryId", "CategoryId");
            AddFilter(sqlBase, parameters, request.Type, "AND t.Type = @Type", "Type");

            if (request.Amount > 0)
                AddFilter(sqlBase, parameters, request.Amount, "AND t.Amount = @Amount", "Amount");

            if (request.CreatedAt != DateTime.MinValue)
                AddFilter(sqlBase, parameters, request.CreatedAt, "AND DATE(t.CreatedAt) = DATE(@CreatedAt)", "CreatedAt");

            var countSql = $"SELECT COUNT(1) FROM ({sqlBase}) AS Total";

            var totalRecords = await GetOneAsync<int>(countSql, parameters);

            var sqlData = new StringBuilder(sqlBase.ToString());
            var offset = (request.Page - 1) * request.PageSize;

            sqlData.AppendLine(" ORDER BY t.CreatedAt DESC ");
            sqlData.AppendLine(" LIMIT @PageSize OFFSET @Offset ");

            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", offset);

            // Usando o GetListAsync da base
            var transactions = (await GetListAsync<Transaction>(sqlData.ToString(), parameters)).ToList();

            return new PagedResponse<Transaction>().ResponseSuccess(
                "List loaded successfully",
                transactions,
                totalRecords,
                request.Page,
                request.PageSize
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetAll transactions");
            throw;
        }
    }

    public async Task<Transaction> GetById(Guid id)
    {
        try
        {
            var sql = $"{TransactionScripts.SelectBase} {TransactionScripts.AndId}";
            return await GetOneAsync<Transaction>(sql, new { Id = id });
        }
        catch (Exception ex)
        {
            LogError(ex, "GetById", "Error executing GetById query", new { Id = id });
            throw;
        }
    }

    public async Task<Response> Insert(Transaction request)
    {
        var sql = $"{TransactionScripts.Insert}";
        var response = new Response();

        try
        {
            if (await ExecuteAsync(sql, request, CrudAction.Insert))
                return response.ResponseSuccess("Successfully created", request);

            return response.ResponseErro("Error while creating record");
        }
        catch (Exception ex)
        {
            LogError(ex, "Insert", sql, request);
            throw;
        }
    }

    public async Task<Response> Update(Transaction request)
    {
        var sql = $"{TransactionScripts.Update}";
        var response = new Response();

        try
        {
            if (await ExecuteAsync(sql, request, CrudAction.Update))
                return response.ResponseSuccess("Successfully updated", request);

            return response.ResponseErro("Error while updating record");
        }
        catch (Exception ex)
        {
            LogError(ex, "Update", sql, request);
            throw;
        }
    }

    public async Task<Response> Delete(Guid id)
    {
        var sql = $"{TransactionScripts.Delete}";
        var parameters = new { Id = id };
        var response = new Response();

        try
        {
            if (await ExecuteAsync(sql, parameters, CrudAction.Delete))
                return response.ResponseSuccess("Successfully deleted", id);

            return response.ResponseErro("Error while deleting record");
        }
        catch (Exception ex)
        {
            LogError(ex, "Delete", sql, parameters);
            throw;
        }
    }
}