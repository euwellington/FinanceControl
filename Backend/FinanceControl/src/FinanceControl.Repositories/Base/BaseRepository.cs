using Dapper;
using FinanceControl.Models.Enums;
using FinanceControl.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System.Security.Claims;
using System.Text;

namespace FinanceControl.Repositories.Base;

public abstract class BaseRepository : IDisposable
{
    public readonly MySqlConnection _mySqlConnection;
    private HttpContext? _context;
    private readonly ILogger _logger;
    protected static ICrudLoggerRepository? _crudLoggerRepositoryStatic;

    protected BaseRepository(MySqlConnection mySqlConnection, ILogger logger, IHttpContextAccessor httpContextAccessor)
    {
        _mySqlConnection = mySqlConnection;
        _logger = logger;
        _context = httpContextAccessor.HttpContext;
    }

    public static void ConfigureCrudLogger(ICrudLoggerRepository logger)
    {
        _crudLoggerRepositoryStatic = logger;
    }

    private async Task EnsureOpenConnectionAsync()
    {
        if (_mySqlConnection.State == System.Data.ConnectionState.Closed)
        {
            await _mySqlConnection.OpenAsync();
        }
    }

    protected Guid GetUserId()
    {
        try
        {
            var identity = _context?.User.Identity as ClaimsIdentity;
            var usuarioId = identity?.FindFirst("Id")?.Value;
            return usuarioId != null ? Guid.Parse(usuarioId) : Guid.Empty;
        }
        catch
        {
            return Guid.Empty;
        }
    }

    protected string GetUserName()
    {
        try
        {
            var identity = _context?.User.Identity as ClaimsIdentity;
            var nome = identity?.FindFirst("Name")?.Value;
            return nome ?? string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }

    protected async Task<bool> ExecuteAsync(string sql, object parameters, CrudAction? action = null)
    {
        await EnsureOpenConnectionAsync();

        try
        {
            var result = await _mySqlConnection.ExecuteAsync(sql, parameters) > 0;

            if (result && parameters != null && action.HasValue && _crudLoggerRepositoryStatic != null)
            {
                var userId = GetUserId();
                var userName = string.IsNullOrEmpty(GetUserName()) ? "First Registration" : GetUserName();

                var idProperty = parameters.GetType().GetProperty("Id");
                var idValue = idProperty?.GetValue(parameters)?.ToString() ?? "";

                await _crudLoggerRepositoryStatic.LogAsync(action.Value, parameters,
                        idValue, userId.ToString(), userName);
            }
            return result;
        }
        catch (Exception ex)
        {
            LogError(ex, "ExecuteAsync", sql, parameters);
            throw;
        }
    }

    protected async Task<T> GetOneAsync<T>(string sql, object filters)
    {
        await EnsureOpenConnectionAsync();
        try
        {
            return await _mySqlConnection.QueryFirstOrDefaultAsync<T>(sql, filters);
        }
        catch (Exception e)
        {
            LogError(e, "GetOneAsync", sql, filters);
            throw;
        }
    }

    protected async Task<IEnumerable<T>> GetListAsync<T>(string sql, object? filters)
    {
        await EnsureOpenConnectionAsync();
        try
        {
            return await _mySqlConnection.QueryAsync<T>(sql, filters);
        }
        catch (Exception ex)
        {
            LogError(ex, "GetListAsync", sql, filters);
            throw;
        }
    }

    protected async Task<bool> AlreadyExistsAsync(string sql, object filters)
    {
        await EnsureOpenConnectionAsync();
        try
        {
            var result = await _mySqlConnection.QueryFirstOrDefaultAsync<int>(sql, filters);
            return result > 0;
        }
        catch (Exception ex)
        {
            LogError(ex, "AlreadyExistsAsync", sql, filters);
            throw;
        }
    }

    protected async Task<IEnumerable<TResult>> GetMultiListAsync<TResult, T1, T2, T3, T4, T5, T6>(
        string sql,
        Func<TResult, T1, T2, T3, T4, T5, T6, TResult> map,
        object filtros,
        string splitOn = "Id"
    ) where TResult : class
    {
        await EnsureOpenConnectionAsync();
        try
        {
            return await _mySqlConnection.QueryAsync<TResult, T1, T2, T3, T4, T5, T6, TResult>(
                sql,
                (result, t1, t2, t3, t4, t5, t6) => map(result, t1, t2, t3, t4, t5, t6),
                filtros,
                splitOn: splitOn
            );
        }
        catch (Exception e)
        {
            LogError(e, "GetMultiListAsync", sql, filtros);
            throw;
        }
    }

    protected static void AddFilter<T>(StringBuilder sql, DynamicParameters parameters, T value, string condition, string paramName)
    {
        if (value == null) return;
        sql.AppendLine($"{condition}");
        parameters.Add(paramName, value);
    }

    protected static void AddLikeFilter<T>(StringBuilder sql, DynamicParameters parameters, T value, string condition, string paramName)
    {
        var text = value?.ToString();
        if (string.IsNullOrWhiteSpace(text)) return;
        sql.AppendLine($"{condition}");
        parameters.Add(paramName, $"%{text}%");
    }

    protected static void AddDatePartsFilter(StringBuilder sql, DynamicParameters parameters, string column, int? year, int? month, int? day, string prefix)
    {
        var parts = new List<string>();
        if (year.HasValue) { parts.Add($"YEAR({column}) = @{prefix}Year"); parameters.Add($"{prefix}Year", year.Value); }
        if (month.HasValue) { parts.Add($"MONTH({column}) = @{prefix}Month"); parameters.Add($"{prefix}Month", month.Value); }
        if (day.HasValue) { parts.Add($"DAY({column}) = @{prefix}Day"); parameters.Add($"{prefix}Day", day.Value); }
        if (parts.Count > 0) sql.AppendLine("AND " + string.Join(" AND ", parts));
    }

    protected static void AddRangeFilter<T>(StringBuilder sql, DynamicParameters parameters, T? from, T? to, string column, string prefix) where T : struct
    {
        if (from.HasValue) { sql.AppendLine($"AND {column} >= @{prefix}From"); parameters.Add($"{prefix}From", from.Value); }
        if (to.HasValue) { sql.AppendLine($"AND {column} <= @{prefix}To"); parameters.Add($"{prefix}To", to.Value); }
    }

    protected static void AddDateFilter(StringBuilder sql, DynamicParameters parameters, DateTime? from, DateTime? to, string column, string prefix)
    {
        if (from.HasValue) { sql.AppendLine($"AND {column} >= @{prefix}From"); parameters.Add($"{prefix}From", from.Value.Date); }
        if (to.HasValue) { sql.AppendLine($"AND {column} <= @{prefix}To"); parameters.Add($"{prefix}To", to.Value.Date); }
    }

    protected void LogError(Exception exception, string methodName, string sql, object? parameters)
    {
        var methodDetails = new { Name = methodName, SQL = sql, Parameters = parameters };
        _logger.LogError(exception, "Error: {Error}. Method: {Method}.", GetError(exception), methodDetails);
    }

    protected void LogError(Exception exception, string methodName, string sql)
    {
        var methodDetails = new { Name = methodName, SQL = sql };
        _logger.LogError(exception, "Error: {Error}. Method: {Method}.", GetError(exception), methodDetails);
    }

    private static string GetError(Exception exception) => exception.InnerException is not null ? exception.InnerException.Message : exception.Message;

    public void Dispose()
    {
        if (_mySqlConnection != null && _mySqlConnection.State != System.Data.ConnectionState.Closed)
        {
            _mySqlConnection.Close();
        }
        _mySqlConnection?.Dispose();
    }
}