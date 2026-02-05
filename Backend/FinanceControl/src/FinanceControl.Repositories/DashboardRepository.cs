using FinanceControl.Models.Entities;
using FinanceControl.Repositories.Base;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Repositories.Scripts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories;

public class DashboardRepository : BaseRepository, IDashboardRepository
{
    private readonly ILogger _logger;

    public DashboardRepository(
        MySqlConnection mySqlConnection,
        ILogger<DashboardRepository> logger,
        IHttpContextAccessor httpContextAccessor) : base(mySqlConnection, logger, httpContextAccessor)
    {
        _logger = logger;
    }

    public async Task<DashboardStats> GetDashboardStats()
    {
        try
        {
            var stats = await _mySqlConnection.QuerySingleOrDefaultAsync<DashboardStats>(
                DashboardScripts.SelectBaseDashboardStats
            );

            stats ??= new DashboardStats();

            var history = await _mySqlConnection.QueryAsync<TransactionHistory>(
                DashboardScripts.SelectRecentTransactionsHistory
            );

            stats.History = history.ToList();

            return stats;
        }
        catch (DbException ex)
        {
            LogError(ex, "GetDashboardStats", "Error executing GetDashboardStats query");
            throw;
        }
        catch (Exception ex)
        {
            LogError(ex, "GetDashboardStats", "Unexpected error in GetDashboardStats");
            throw;
        }
    }
}