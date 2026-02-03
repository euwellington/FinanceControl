using FinanceControl.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services.Interfaces;

public interface IAuthService
{
    Task<Response> ValidationUser(Auth request);
}