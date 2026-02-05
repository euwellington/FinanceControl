using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class DashboardStats
{
    public int TotalCategories { get; set; }
    public int TotalPeople { get; set; }
    public int TotalTransactions { get; set; }

    public decimal Revenue { get; set; }
    public decimal Expenses { get; set; }
    public decimal NetBalance { get; set; }

    public double AvgAgeOfTransactingPeople { get; set; }

    public bool IsPositiveBalance => NetBalance >= 0;

    public List<TransactionHistory> History { get; set; } = new();
}

public class TransactionHistory
{
    public DateTime TransactionDate { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}