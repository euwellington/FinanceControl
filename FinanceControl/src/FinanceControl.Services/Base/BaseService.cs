using FinanceControl.Models.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services.Base;

public abstract class BaseService
{
    private readonly ILogger _logger;
    private HttpContext? _context;

    protected BaseService(ILogger logger, IHttpContextAccessor httpContextAccessor)
    {
        _logger = logger;
        _context = httpContextAccessor.HttpContext;
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
            var userName = identity?.FindFirst("Name")?.Value ?? "";
            return userName;
        }
        catch
        {
            return string.Empty;
        }
    }

    protected void LogError(Exception exception, string methodName, object? parameters)
    {
        var method = new { Name = methodName, Parameters = parameters };
        _logger.LogError(exception, "Error: {Error}. Method: {Method}.", GetError(exception), method);
    }

    protected void LogWarning(string message, string methodName, object? parameters)
    {
        var method = new { Name = methodName, Parameters = parameters };
        _logger.LogWarning("Warning: {Message}. Method: {Method}.", message, method);
    }

    protected void LogInformation(string message, string methodName, object? parameters)
    {
        var method = new { Name = methodName, Parameters = parameters };
        _logger.LogInformation("Information: {Message}. Method: {Method}.", message, method);
    }

    protected Response ExecuteValidation<TV, TE>(TV validation, TE entitie) where TV : AbstractValidator<TE>
    {
        Response response = new Response();
        var validator = validation.Validate(entitie);
        if (validator.IsValid) return response.ResponseSuccess("sucesso", new { });
        return response.ResponseErro(validator.ToString());
    }

    protected async Task<Response> ExecuteValidationAsync<TV, TE>(TV validator, TE entity)
        where TV : AbstractValidator<TE>
    {
        var result = await validator.ValidateAsync(entity);
        if (result.IsValid)
            return new Response { Error = false, Message = "Sucesso" };

        var errors = string.Join("; ", result.Errors.Select(e => e.ErrorMessage));
        return new Response { Error = true, Message = errors };
    }


    protected static Response ReturnResponse(Exception exception)
    {
        Response response = new Response();
        return response.ResponseErro(GetError(exception));
    }

    protected static DateTime GetCurrentTime() => DateTime.UtcNow.AddHours(-3);

    private static string GetError(Exception exception)
        => exception.InnerException is not null ? exception.InnerException.Message : exception.Message;

}