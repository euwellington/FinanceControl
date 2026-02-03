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
            SUM(CASE WHEN t.Type = @Income THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = @Expense THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM people p
        LEFT JOIN transactions t ON t.PersonId = p.Id
        GROUP BY p.Id, p.Name
    ";

    public const string SelectBaseTotalIncomeExpense = @"
       SELECT 
            SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM transactions t
    ";


    public const string SelectBaseCategoryTransaction = @"
       SELECT 
            c.Id AS CategoryId,
            c.Name,
            SUM(CASE WHEN t.Type = @Income THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = @Expense THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM categories c
        LEFT JOIN transactions t ON t.CategoryId = c.Id
        GROUP BY c.Id, c.Name
    ";

    public const string SelectBaseTotalIncomeExpenseCategory = @"
       SELECT
            SUM(CASE WHEN t.Type = 'Income' THEN t.Amount ELSE 0 END) AS TotalIncome,
            SUM(CASE WHEN t.Type = 'Expense' THEN t.Amount ELSE 0 END) AS TotalExpense
        FROM transactions t
    ";
}