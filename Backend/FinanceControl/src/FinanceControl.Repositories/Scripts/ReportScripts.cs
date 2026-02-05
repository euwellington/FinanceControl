using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Scripts;

public class ReportScripts
{
    public const string SelectBasePeopleTransaction = @"
        SELECT 
            p.Id AS PersonId,
            p.Name,
            SUM(CASE WHEN t.Type = @Income AND t.DeletedAt IS NULL THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = @Expense AND t.DeletedAt IS NULL THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM people p
        LEFT JOIN transactions t ON t.PersonId = p.Id AND t.DeletedAt IS NULL
        WHERE p.DeletedAt IS NULL
        GROUP BY p.Id, p.Name
    ";

    public const string SelectBaseTotalIncomeExpense = @"
       SELECT 
            SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM transactions t
        WHERE t.DeletedAt IS NULL
    ";

    public const string SelectBaseCategoryTransaction = @"
       SELECT 
            c.Id AS CategoryId,
            c.Description,
            c.Purpose,
            SUM(CASE WHEN t.Type = @Income AND t.DeletedAt IS NULL THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = @Expense AND t.DeletedAt IS NULL THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM categories c
        LEFT JOIN transactions t ON t.CategoryId = c.Id AND t.DeletedAt IS NULL
        WHERE c.DeletedAt IS NULL
        GROUP BY c.Id, c.Description
    ";

    public const string SelectBaseTotalIncomeExpenseCategory = @"
       SELECT
            SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM transactions t
        WHERE t.DeletedAt IS NULL
    ";
}