using System;

namespace FinanceControl.Repositories.Scripts;

public class PeopleScripts
{
    public const string SelectBase = @"
        SELECT 
            p.Id,
            p.Name,
            p.Age,
            p.Email,
            p.CreatedAt,
            p.UpdatedAt
        FROM people p
        WHERE p.DeletedAt IS NULL
    ";

    public const string Insert = @"
        INSERT INTO people
            (Id, Name, Age, Email, Password)
        VALUES
            (@Id, @Name, @Age, @Email, MD5(@Password));
    ";

    public const string Update = @"
        UPDATE people
        SET
            Name = @Name,
            Age = @Age,
            Email = @Email,
            Password = MD5(@Password),
            UpdatedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    public const string UpdateLastLogin = @"
        UPDATE people
        SET
            LastLogin = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    public const string Delete = @"
        UPDATE people
        SET DeletedAt = NOW()
        WHERE Id = @Id
          AND DeletedAt IS NULL;
    ";

    internal static readonly string AndId = @"
        AND p.Id = @Id
    ";


    internal static readonly string PersonCredentials = @"
        AND Email = @Email
        AND Password = @Password
    ";

    public const string SelectByEmail = @"
        SELECT COUNT(1)
        FROM people
        WHERE Email = @Email
            AND DeletedAt IS NULL;
    ";
}