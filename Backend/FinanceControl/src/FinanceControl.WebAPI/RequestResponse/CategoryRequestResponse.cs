using FinanceControl.Models.Enums;

namespace FinanceControl.WebAPI.RequestResponse;


public class CategoryRequest
{
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }
}

public class CategoryUpdateRequest
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }
}

public class CategoryResponse
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public CategoryPurpose Purpose { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}