using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Hubs;
using FinanceControl.Services.Interfaces;
using FinanceControl.Services.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Data.Common;
using System.Threading.Tasks;

namespace FinanceControl.Services;

public class TransactionService : BaseService, ITransactionService
{
    private readonly ILogger _logger;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IPeopleRepository _peopleRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IHubService _hubService;

    public TransactionService(
        ILogger<TransactionService> logger,
        IHttpContextAccessor httpContextAccessor,
        ITransactionRepository transactionRepository,
        IPeopleRepository peopleRepository,
        ICategoryRepository categoryRepository,
        IHubService hubService
    ) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _transactionRepository = transactionRepository;
        _peopleRepository = peopleRepository;
        _categoryRepository = categoryRepository;
        _hubService = hubService;
    }

    public async Task<PagedResponse<Transaction>> GetAll(TransactionModel request)
    {
        try
        {
            return await _transactionRepository.GetAll(request);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving transactions: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving transactions: {ex.Message}", ex);
        }
    }

    public async Task<Transaction> GetById(Guid id)
    {
        try
        {
            return await _transactionRepository.GetById(id);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving transaction: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving transaction: {ex.Message}", ex);
        }
    }

    public async Task<Response> Insert(Transaction request)
    {
        try
        {
            var validation = await ExecuteValidationAsync(new TransactionValidation(_peopleRepository, _categoryRepository, false), request);
            if (validation.Error) return validation;


            // Dispara a notificação via Hub em paralelo, sem travar o fluxo
            _ = Task.Run(async () =>
            {
                try
                {
                    // Monta o objeto HubTransaction com os dados completos
                    var hubData = new HubTransaction
                    {
                        Transaction = request,
                        People = await _peopleRepository.GetById(request.PersonId), // pega a pessoa
                        Category = await _categoryRepository.GetById(request.CategoryId) // pega a categoria
                    };

                    // Envia para todos os clientes conectados
                    await _hubService.HandlerStatusTransitions(hubData);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao enviar notificação de transação via Hub");
                }
            });

            var insert = await _transactionRepository.Insert(request);
            if (insert.Error) return insert;

            return insert;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error creating transaction: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error creating transaction: {ex.Message}", ex);
        }
    }

    public async Task<Response> Update(Transaction request)
    {
        try
        {
            var validation = ExecuteValidation(new TransactionValidation(_peopleRepository, _categoryRepository, true), request);
            if (validation.Error) return validation;

            var update = await _transactionRepository.Update(request);
            if (update.Error) return update;

            return update;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error updating transaction: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error updating transaction: {ex.Message}", ex);
        }
    }

    public async Task<Response> Delete(Guid id)
    {
        try
        {
            var transaction = await GetById(id);
            if (transaction == null)
                return new Response().ResponseErro("Transaction not found");

            var delete = await _transactionRepository.Delete(id);
            if (delete.Error) return delete;

            return delete;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error deleting transaction: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error deleting transaction: {ex.Message}", ex);
        }
    }
}
