using FinanceControl.Models.Enums;

namespace FinanceControl.WebAPI.RequestResponse;


public class TransactionRequest
{
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
}

public class TransactionUpdateRequest
{
    public Guid Id { get; set; }
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
}

public class TransactionResponse
{
    public Guid Id { get; set; }
    public Guid CategoryId { get; set; }
    public Guid PersonId { get; set; }
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Type { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}