using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services.Interfaces;

public interface ITransactionService
{
    Task<PagedResponse<Transaction>> GetAll(TransactionModel request);
    Task<Transaction> GetById(Guid id);
    Task<Response> Insert(Transaction request);
    Task<Response> Update(Transaction request);
    Task<Response> Delete(Guid id);
}