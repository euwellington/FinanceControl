using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class Transaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
    public string Description { get; set; }
    public string PeopleName { get; set; }
    public int PeopleAge { get; set; }
    public string DescriptionCategory { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public CategoryPurpose TypeCategory { get; set; }


    public decimal Amount { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType Type { get; set; }
    public string TypeString => Type.ToString();

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public object Serialize() => new { Transaction = JsonSerializer.Serialize(this) };
}