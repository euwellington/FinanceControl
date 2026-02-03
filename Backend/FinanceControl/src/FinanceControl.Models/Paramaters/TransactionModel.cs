using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Paramaters;

public class TransactionModel
{
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
    public DateTime CreatedAt { get; set; }

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}