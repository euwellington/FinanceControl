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
    private readonly ILogger _logger;

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
            var sql = new StringBuilder();
            sql.AppendLine(TransactionScripts.SelectBase);

            var parameters = new DynamicParameters(); 

            AddLikeFilter(sql, parameters, request.Description, "t.Description LIKE @Description", "Description");
            AddFilter(sql, parameters, request.PersonId, "t.PersonId = @PersonId", "PersonId");
            AddFilter(sql, parameters, request.CategoryId, "t.CategoryId = @CategoryId", "CategoryId");
            AddFilter(sql, parameters, request.Type, "t.Type = @Type", "Type");

            if (request.Amount > 0)
                AddFilter(sql, parameters, request.Amount, "t.Amount = @Amount", "Amount");

            if (request.CreatedAt != DateTime.MinValue)
                AddFilter(sql, parameters, request.CreatedAt, "DATE(t.CreatedAt) = DATE(@CreatedAt)", "CreatedAt");

            var countSql = $"SELECT COUNT(1) FROM ({sql}) AS CountQuery";
            var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

            var offset = (request.Page - 1) * request.PageSize;
            sql.AppendLine("ORDER BY t.CreatedAt DESC");
            sql.AppendLine("LIMIT @PageSize OFFSET @Offset");

            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", offset);

            var transactions = (await _mySqlConnection
                .QueryAsync<Transaction>(sql.ToString(), parameters))
                .ToList();

            return new PagedResponse<Transaction>().ResponseSuccess(
                "List loaded successfully",
                transactions,
                totalRecords,
                request.Page,
                request.PageSize
            );
        }
        catch
        {
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
        catch (DbException ex)
        {
            LogError(ex, "GetById", "Error executing GetById query", new { Id = id });
            throw;
        }
        catch (Exception ex)
        {
            LogError(ex, "GetById", "Unexpected error in GetById", new { Id = id });
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
        catch (DbException ex)
        {
            LogError(ex, "Insert", sql, request.Serialize());
            throw;
        }
    }

    public async Task<Response> Update(Transaction request)
    {
        var sql = $"{TransactionScripts.Update}";
        var response = new Response();

        try
        {
            var typeString = request.Type.ToString();

            request.Type = Enum.TryParse(typeString, out TransactionType parsedType)
                ? parsedType
                : throw new ArgumentException($"Invalid TransactionType: {typeString}");

            if (await ExecuteAsync(sql, request, CrudAction.Update))
                return response.ResponseSuccess("Successfully updated", request);

            return response.ResponseErro("Error while updating record");
        }
        catch (DbException ex)
        {
            LogError(ex, "Update", sql, request.Serialize());
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
        catch (DbException ex)
        {
            LogError(ex, "Delete", sql, parameters);
            throw;
        }
    }
}