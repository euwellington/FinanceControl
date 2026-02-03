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

public class CategoryRepository : BaseRepository, ICategoryRepository
{
    private readonly ILogger _logger;

    public CategoryRepository(
        MySqlConnection mySqlConnection,
        ILogger<CategoryRepository> logger,
        IHttpContextAccessor httpContextAccessor
    ) : base(mySqlConnection, logger, httpContextAccessor)
    {
        _logger = logger;
    }

    public async Task<PagedResponse<Category>> GetAll(CategoryModel request)
    {
        try
        {
            var sql = new StringBuilder();
            sql.AppendLine(CategoryScripts.SelectBase);

            var parameters = new DynamicParameters();

            AddLikeFilter(
                sql,
                parameters,
                request.Description,
                "c.Description LIKE @Description",
                "Description"
            );

            AddFilter(
                sql,
                parameters,
                request.Purpose,
                "c.Purpose = @Purpose",
                "Purpose"
            );

            var countSql = $"SELECT COUNT(1) FROM ({sql}) AS CountQuery";
            var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

            var offset = (request.Page - 1) * request.PageSize;

            sql.AppendLine("ORDER BY c.CreatedAt DESC");
            sql.AppendLine("LIMIT @PageSize OFFSET @Offset");

            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", offset);

            var categories = (await _mySqlConnection
                .QueryAsync<Category>(sql.ToString(), parameters))
                .ToList();

            return new PagedResponse<Category>().ResponseSuccess(
                "List loaded successfully",
                categories,
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

    public async Task<Category> GetById(Guid id)
    {
        try
        {
            var sql = $"{CategoryScripts.SelectBase} {CategoryScripts.AndId}";
            return await GetOneAsync<Category>(sql, new { Id = id });
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

    public async Task<Response> Insert(Category request)
    {
        var sql = $"{CategoryScripts.Insert}";
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

    public async Task<Response> Update(Category request)
    {
        var sql = $"{CategoryScripts.Update}";
        var response = new Response();

        try
        {
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
        var sql = $"{CategoryScripts.Delete}";
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