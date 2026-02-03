using FinanceControl.Models.Entities;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using FinanceControl.Services.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services;

public class AuthService : BaseService, IAuthService
{
    Response _response = new Response();
    private readonly JwtValidation _jwtValidation;
    private readonly ILogger _logger;
    private readonly IPeopleRepository _peopleRepository;

    public AuthService(
        ILogger<AuthService> logger, 
        IHttpContextAccessor httpContextAccessor,
        JwtValidation jwtValidation,
        IPeopleRepository peopleRepository) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _peopleRepository = peopleRepository;
        _jwtValidation = jwtValidation;
    }

    public async Task<Response> ValidationUser(Auth request)
    {
        try
        {
            var validation = ExecuteValidation(new AuthValidation(), request);
            if (validation.Error)
                return validation;

            var people = await _peopleRepository.GetByCredential(request.Email, request.Password);
            if (people == null)
                return _response.ResponseErro("Usuário ou senha inválido");

            var tokenRequest = _jwtValidation.JtwToken(people, request.ServiceId);
            if (tokenRequest.Error) return tokenRequest;
            await _peopleRepository.UploadLastLogin(people);
            return _response.ResponseSuccess("Autenticado com sucesso", tokenRequest.Message);
        }
        catch (DbException ex)
        {
            LogError(ex, "ValidationUser", request.Serialize());
            throw;
        }
    }
}