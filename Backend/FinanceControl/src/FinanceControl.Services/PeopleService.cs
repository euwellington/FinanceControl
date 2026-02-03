using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using FinanceControl.Services.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.Common;

namespace FinanceControl.Services;

public class PeopleService : BaseService, IPeopleService
{
    private readonly ILogger _logger;
    private readonly IPeopleRepository _peopleRepository;

    public PeopleService(
        ILogger<PeopleService> logger,
        IHttpContextAccessor httpContextAccessor,
        IPeopleRepository peopleRepository
        ) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _peopleRepository = peopleRepository;
    }

    public async Task<PagedResponse<People>> GetAll(PeopleModel request)
    {
        try
        {
            return await _peopleRepository.GetAll(request);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving data: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving data: {ex.Message}", ex);
        }
    }

    public async Task<People> GetById(Guid id)
    {
        try
        {
            return await _peopleRepository.GetById(id);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving data: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving data: {ex.Message}", ex);
        }
    }

    public async Task<Response> Insert(People request)
    {
        try
        {
            var validation = ExecuteValidation(new PeopleValidation(_peopleRepository, false), request);
            if (validation.Error) return validation;

            var insert = await _peopleRepository.Insert(request);
            if (insert.Error) return insert;

            return insert;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error creating record: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error creating record: {ex.Message}", ex);
        }
    }

    public async Task<Response> Update(People request)
    {
        try
        {
            var validation = ExecuteValidation(new PeopleValidation(_peopleRepository, true), request);
            if (validation.Error) return validation;

            var update = await _peopleRepository.Update(request);
            if (update.Error) return update;

            return update;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error updating record: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error updating record: {ex.Message}", ex);
        }
    }

    public async Task<Response> Delete(Guid id)
    {
        try
        {
            var hasPeople = await GetById(id);
            if (hasPeople == null)
                return new Response().ResponseErro("Record not found");

            var delete = await _peopleRepository.Delete(id);
            if (delete.Error) return delete;

            return delete;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error deleting record: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error deleting record: {ex.Message}", ex);
        }
    }
}