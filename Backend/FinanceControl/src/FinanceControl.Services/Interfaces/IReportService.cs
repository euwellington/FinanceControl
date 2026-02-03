using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services.Interfaces;

public interface IReportService
{
    // Listagem de todas as transições por pessoas
    Task<PagedResponse<PersonTotal>> GetTransactionsPeople(ReportTransactionPeopleModel request);
    Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpense();

    // Listagem de todas as transições por categorias
    Task<PagedResponse<PersonTotal>> GetTransactionsCategory(ReportTransactionCategoryModel request);
    Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpenseByCategory();
}