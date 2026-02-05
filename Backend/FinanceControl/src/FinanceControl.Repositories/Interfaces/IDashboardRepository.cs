using FinanceControl.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardStats> GetDashboardStats();
}