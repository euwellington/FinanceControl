using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services;

public class ReportService : BaseService, IReportService
{

    private readonly ILogger _logger;
    private readonly IReportRepository _reportReporitory;

    public ReportService(
        ILogger<ReportService> logger, 
        IHttpContextAccessor httpContextAccessor,
        IReportRepository reportReporitory) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _reportReporitory = reportReporitory;
    }

    public async Task<PagedResponse<PersonTotal>> GetTransactionsPeople(ReportTransactionPeopleModel request)
    {
        try
        {
            return await _reportReporitory.GetTransactionsPeople(request);
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

    public async Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpense()
    {
        try
        {
            return await _reportReporitory.GetTotalIncomeExpense();
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

    public async Task<PagedResponse<CategoryTotal>> GetTransactionsCategory(ReportTransactionCategoryModel request)
    {
        try
        {
            return await _reportReporitory.GetTransactionsCategory(request);
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

    public async Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpenseByCategory()
    {
        try
        {
            return await _reportReporitory.GetTotalIncomeExpenseByCategory();
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
}