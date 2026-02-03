using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class Category
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }
    [NotMapped]
    public string PurposeString => Purpose.ToString();
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public object Serialize() => new { Category = JsonSerializer.Serialize(this) };
}