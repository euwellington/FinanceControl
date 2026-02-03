using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Interfaces;

public interface ICrudLoggerRepository
{
    Task LogAsync(
        CrudAction action,
        object entity,
        string entityId,
        string userId,
        string userName
    );
}