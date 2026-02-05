using FinanceControl.Models.Entities;
using FinanceControl.Repositories;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services;

public class DashboardService : BaseService, IDashboardService
{
    private readonly ILogger _logger;
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(
        ILogger<DashboardService> logger, 
        IHttpContextAccessor httpContextAccessor,
        IDashboardRepository dashboardRepository
        ) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardStats> GetDashboardStats()
    {
        try
        {
            return await _dashboardRepository.GetDashboardStats();
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving dashboard: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving dashboard: {ex.Message}", ex);
        }
    }
}