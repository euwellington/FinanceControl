using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Interfaces;

public interface IPeopleRepository
{
    Task<PagedResponse<People>> GetAll(PeopleModel request);
    Task<People> GetById(Guid id);
    Task<bool> UploadLastLogin(People people);
    Task<People> GetByCredential(string email, string password);
    Task<Response> Insert(People request);
    Task<Response> Update(People request);
    Task<Response> Delete(Guid id);

    bool AlreadyEmail(string email);
}