using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Paramaters;

public class CategoryModel
{
    public string? Description { get; set; }
    public CategoryPurpose? Purpose { get; set; }
    public DateTime CreatedAt { get; set; }

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}