using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class CategoryTotal
{
    public Guid CategoryId { get; set; }
    public string Description { get; set; }
    public CategoryPurpose Purpose { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Balance => TotalIncome - TotalExpense;
}