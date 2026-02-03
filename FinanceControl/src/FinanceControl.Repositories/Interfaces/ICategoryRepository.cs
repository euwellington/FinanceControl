using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<PagedResponse<Category>> GetAll(CategoryModel request);
    Task<Category> GetById(Guid id);
    Task<Response> Insert(Category request);
    Task<Response> Update(Category request);
    Task<Response> Delete(Guid id);
}