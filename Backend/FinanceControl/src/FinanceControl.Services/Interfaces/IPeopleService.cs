using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Services.Interfaces;

public interface IPeopleService
{
    Task<PagedResponse<People>> GetAll(PeopleModel request);
    Task<People> GetById(Guid id);
    Task<Response> Insert(People request);
    Task<Response> Update(People request);
    Task<Response> Delete(Guid id);
}