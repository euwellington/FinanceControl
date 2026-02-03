using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using FinanceControl.Services.Validation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Data.Common;
using System;
using System.Threading.Tasks;

namespace FinanceControl.Services;

public class CategoryService : BaseService, ICategoryService
{
    private readonly ILogger _logger;
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(
        ILogger<CategoryService> logger,
        IHttpContextAccessor httpContextAccessor,
        ICategoryRepository categoryRepository
    ) : base(logger, httpContextAccessor)
    {
        _logger = logger;
        _categoryRepository = categoryRepository;
    }

    public async Task<PagedResponse<Category>> GetAll(CategoryModel request)
    {
        try
        {
            return await _categoryRepository.GetAll(request);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving categories: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving categories: {ex.Message}", ex);
        }
    }

    public async Task<Category> GetById(Guid id)
    {
        try
        {
            return await _categoryRepository.GetById(id);
        }
        catch (DbException ex)
        {
            throw new Exception($"Error retrieving category: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error retrieving category: {ex.Message}", ex);
        }
    }

    public async Task<Response> Insert(Category request)
    {
        try
        {
            var validation = ExecuteValidation(new CategoryValidation(false), request);
            if (validation.Error) return validation;

            var insert = await _categoryRepository.Insert(request);
            if (insert.Error) return insert;

            return insert;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error creating category: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error creating category: {ex.Message}", ex);
        }
    }

    public async Task<Response> Update(Category request)
    {
        try
        {
            var validation = ExecuteValidation(new CategoryValidation(true), request);
            if (validation.Error) return validation;

            var update = await _categoryRepository.Update(request);
            if (update.Error) return update;

            return update;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error updating category: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error updating category: {ex.Message}", ex);
        }
    }

    public async Task<Response> Delete(Guid id)
    {
        try
        {
            var category = await GetById(id);
            if (category == null)
                return new Response().ResponseErro("Category not found");

            var delete = await _categoryRepository.Delete(id);
            if (delete.Error) return delete;

            return delete;
        }
        catch (DbException ex)
        {
            throw new Exception($"Error deleting category: {ex.Message}", ex);
        }
        catch (Exception ex)
        {
            throw new Exception($"Error deleting category: {ex.Message}", ex);
        }
    }
}
