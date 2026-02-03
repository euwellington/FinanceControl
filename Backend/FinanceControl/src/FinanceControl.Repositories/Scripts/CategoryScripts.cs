using System;

namespace FinanceControl.Repositories.Scripts;

public class CategoryScripts
{
    public const string SelectBase = @"
        SELECT
            c.Id,
            c.Description,
            c.Purpose,
            c.CreatedAt,
            c.UpdatedAt
        FROM categories c
        WHERE c.DeletedAt IS NULL
    ";

    public const string Insert = @"
        INSERT INTO categories
            (Id, Description, Purpose)
        VALUES
            (@Id, @Description, @PurposeString);
    ";

    public const string Update = @"
        UPDATE categories
        SET
            Description = @Description,
            Purpose = @PurposeString,
            UpdatedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    public const string Delete = @"
        UPDATE categories
        SET DeletedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    internal static readonly string AndId = @"
        AND c.Id = @Id
    ";

    internal static readonly string AndPurpose = @"
        AND c.Purpose = @Purpose
    ";
}
