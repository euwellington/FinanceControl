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
using System.Data.Common;
using System.Text;

namespace FinanceControl.Repositories;

public class PeopleRepository : BaseRepository, IPeopleRepository
{
    private readonly ILogger _logger;

    public PeopleRepository(
        MySqlConnection mySqlConnection,
        ILogger<PeopleRepository> logger,
        IHttpContextAccessor httpContextAccessor
    ) : base(mySqlConnection, logger, httpContextAccessor)
    {
        _logger = logger;
    }

    public async Task<PagedResponse<People>> GetAll(PeopleModel request)
    {
        try
        {
            var sql = new StringBuilder(); 
            sql.AppendLine(PeopleScripts.SelectBase);

            var parameters = new DynamicParameters();

            AddLikeFilter(
                sql,
                parameters,
                request.Name,
                "p.Name LIKE @Name",
                "Name"
            );

            AddFilter(sql, parameters, request.Age > 0 ? (int?)request.Age : null, "p.Age = @Age", "Age");
            AddFilter(sql, parameters, request.CreatedAt != DateTime.MinValue ? (DateTime?)request.CreatedAt : null, "DATE(p.CreatedAt) = DATE(@CreatedAt)", "CreatedAt");

            var countSql = $"SELECT COUNT(1) FROM ({sql}) AS CountQuery";
            var totalRecords = await _mySqlConnection.ExecuteScalarAsync<int>(countSql, parameters);

            var offset = (request.Page - 1) * request.PageSize;

            sql.AppendLine("ORDER BY p.CreatedAt DESC");
            sql.AppendLine("LIMIT @PageSize OFFSET @Offset");

            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", offset);

            var people = (await _mySqlConnection
                .QueryAsync<People>(sql.ToString(), parameters))
                .ToList();

            return new PagedResponse<People>().ResponseSuccess(
                "List loaded successfully",
                people,
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

    public async Task<People> GetById(Guid id)
    {
        try
        {
            var sql = $"{PeopleScripts.SelectBase} {PeopleScripts.AndId}";
            return await GetOneAsync<People>(sql, new { Id = id });
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

    public bool AlreadyEmail(string email)
    {
        try
        {
            var sql = PeopleScripts.SelectByEmail;

            var count = GetOneAsync<int>(sql, new { Email = email }).Result;
            return count > 0;
        }
        catch (DbException ex)
        {
            LogError(ex, "AlreadyEmail", "Error executing AlreadyEmail query", new { Email = email });
            throw;
        }
        catch (Exception ex)
        {
            LogError(ex, "AlreadyEmail", "Unexpected error in AlreadyEmail", new { Email = email });
            throw;
        }
    }

    public async Task<bool> UploadLastLogin(People people)
    {
        try
        {
            var sql = $"{PeopleScripts.UpdateLastLogin}";
            return await ExecuteAsync(sql, people, CrudAction.Insert);
        }
        catch (DbException ex)
        {
            LogError(ex, "GetById", "Error executing GetById query", people);
            throw;
        }
        catch (Exception ex)
        {
            LogError(ex, "GetById", "Unexpected error in GetById", people);
            throw;
        }
    }


    public async Task<People> GetByCredential(string email, string password)
    {
        try
        {
            var sql = $"{PeopleScripts.SelectBase} {PeopleScripts.PersonCredentials}";
            return await GetOneAsync<People>(sql, new { Email = email, Password = password });
        }
        catch (DbException ex)
        {
            LogError(ex, "GetById", "Error executing GetByCredential query", new { Email = email, Password = password });
            throw;
        }
        catch (Exception ex)
        {
            LogError(ex, "GetByCredential", "Unexpected error in GetByCredential", new { Email = email, Password = password  });
            throw;
        }
    }

    public async Task<Response> Insert(People request)
    {
        var sql = $"{PeopleScripts.Insert}";
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

    public async Task<Response> Update(People request)
    {
        var sql = $"{PeopleScripts.Update}";
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
        var sql = $"{PeopleScripts.Delete}";
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