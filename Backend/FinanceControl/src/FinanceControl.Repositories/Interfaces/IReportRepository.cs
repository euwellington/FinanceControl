using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Interfaces;

public interface IReportRepository
{
    // Listagem de todas as transições por pessoas
    Task<PagedResponse<PersonTotal>> GetTransactionsPeople(ReportTransactionPeopleModel request);
    Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpense();

    // Listagem de todas as transições por categorias
    Task<PagedResponse<CategoryTotal>> GetTransactionsCategory(ReportTransactionCategoryModel request);
    Task<(decimal TotalIncome, decimal TotalExpense)> GetTotalIncomeExpenseByCategory();
}