using System;

namespace FinanceControl.Repositories.Scripts;

public class TransactionScripts
{
    public const string SelectBase = @"
       SELECT 
            t.Id,
            t.CategoryId,
            t.PersonId,
            t.Description,
            p.Name AS PeopleName,
            p.Age AS PeopleAge,
            c.Description AS DescriptionCategory,
            t.Type AS TypeCategory,
            t.Amount,
            t.Type,
            t.CreatedAt,
            t.UpdatedAt
        FROM
            transactions t
                INNER JOIN
            categories c ON c.Id = t.CategoryId
                INNER JOIN
            people p ON p.Id = t.PersonId
        WHERE
            t.DeletedAt IS NULL
                AND p.DeletedAt IS NULL
                AND c.DeletedAt IS NULL
            ";

    public const string Insert = @"
        INSERT INTO transactions
            (Id, CategoryId, PersonId, Description, Amount, Type)
        VALUES
            (@Id, @CategoryId, @PersonId, @Description, @Amount, @TypeString);
    ";

    public const string Update = @"
        UPDATE transactions
        SET
            CategoryId = @CategoryId,
            PersonId = @PersonId,
            Description = @Description,
            Amount = @Amount,
            Type = @TypeString,
            UpdatedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    public const string Delete = @"
        UPDATE transactions
        SET DeletedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    internal static readonly string AndId = @"
        AND t.Id = @Id
    ";

    internal static readonly string AndCategoryId = @"
        AND t.CategoryId = @CategoryId
    ";

    internal static readonly string AndPersonId = @"
        AND t.PersonId = @PersonId
    ";

    internal static readonly string AndType = @"
        AND t.Type = @Type
    ";
}
