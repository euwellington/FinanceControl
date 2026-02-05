using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Paramaters;

public class ReportTransactionPeopleModel
{
    public Guid? PeopleId { get; set; }
    public string? Name { get; set; } = string.Empty;

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

public class ReportTransactionCategoryModel
{
    public Guid? CategoryId { get; set; }
    public string? Description { get; set; }

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}