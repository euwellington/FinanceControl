using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Scripts;

public class DashboardScripts
{
    public const string SelectBaseDashboardStats = @"
        SELECT 
            (SELECT COUNT(*) FROM people WHERE DeletedAt IS NULL) AS TotalPeople,
            (SELECT COUNT(*) FROM categories WHERE DeletedAt IS NULL) AS TotalCategories,
            COUNT(t.Id) AS TotalTransactions,
            COALESCE(SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END), 0) AS Revenue,
            COALESCE(SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END), 0) AS Expenses,
            COALESCE(SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END) - 
                     SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END), 0) AS NetBalance,
            COALESCE(AVG(CAST(p.Age AS FLOAT)), 0) AS AvgAgeOfTransactingPeople
        FROM transactions t
        LEFT JOIN people p ON t.PersonId = p.Id AND p.DeletedAt IS NULL
        WHERE t.DeletedAt IS NULL;
    ";

    public const string SelectRecentTransactionsHistory = @"
        SELECT 
            CreatedAt AS TransactionDate,
            Amount,
            Type,
            Description
        FROM transactions
        WHERE DeletedAt IS NULL
        ORDER BY CreatedAt DESC
        LIMIT 10;
    ";
}