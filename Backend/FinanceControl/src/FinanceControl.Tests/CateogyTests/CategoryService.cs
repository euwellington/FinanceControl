using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services;
using FinanceControl.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace FinanceControl.Tests.CategoryTests;

public class CategoryServiceTests
{
    private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
    private readonly Mock<ILogger<CategoryService>> _loggerMock;
    private readonly CategoryService _categoryService;

    public CategoryServiceTests()
    {
        _categoryRepositoryMock = new Mock<ICategoryRepository>();
        _loggerMock = new Mock<ILogger<CategoryService>>();

        var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        httpContextAccessorMock.Setup(h => h.HttpContext).Returns(new DefaultHttpContext());

        _categoryService = new CategoryService(
            _loggerMock.Object,
            httpContextAccessorMock.Object,
            _categoryRepositoryMock.Object
        );
    }

    [Fact]
    public async Task GetAll_ShouldReturnListOfCategories()
    {
        var category1 = new Category { Id = Guid.NewGuid(), Description = "Food", Purpose = CategoryPurpose.Expense };
        var category2 = new Category { Id = Guid.NewGuid(), Description = "Salary", Purpose = CategoryPurpose.Income };

        var list = new List<Category> { category1, category2 };

        var pagedResponse = new PagedResponse<Category>().ResponseSuccess(
            "Categorias recuperadas com sucesso",
            list,
            list.Count,
            page: 1,
            pageSize: 10
        );

        _categoryRepositoryMock.Setup(r => r.GetAll(It.IsAny<CategoryModel>())).ReturnsAsync(pagedResponse);

        var result = await _categoryService.GetAll(new CategoryModel());

        result.Should().NotBeNull();
        result.Data.Should().HaveCount(2);
        result.Data.Should().BeAssignableTo<IEnumerable<Category>>();

        foreach (var cat in result.Data)
        {
            cat.Id.Should().NotBe(Guid.Empty);
            cat.Description.Should().NotBeNullOrWhiteSpace();
            Enum.IsDefined(typeof(CategoryPurpose), cat.Purpose).Should().BeTrue();
        }
    }

    [Fact]
    public async Task GetById_ShouldReturnCategory_WhenExists()
    {
        var category = new Category { Id = Guid.NewGuid(), Description = "Travel", Purpose = CategoryPurpose.Expense };

        _categoryRepositoryMock.Setup(r => r.GetById(category.Id)).ReturnsAsync(category);

        var result = await _categoryService.GetById(category.Id);

        result.Should().NotBeNull();
        result.Id.Should().Be(category.Id);
        result.Description.Should().Be("Travel");
        Enum.IsDefined(typeof(CategoryPurpose), result.Purpose).Should().BeTrue();
    }

    [Fact]
    public async Task Insert_ShouldCreateCategory_WhenDataIsValid()
    {
        var category = new Category { Id = Guid.NewGuid(), Description = "Health", Purpose = CategoryPurpose.Expense };

        var response = new Response<Category>().ResponseSuccess("Successfully created", category);
        _categoryRepositoryMock.Setup(r => r.Insert(category)).ReturnsAsync(response);

        var result = await _categoryService.Insert(category);
        var typedResult = result as Response<Category>;

        typedResult.Should().NotBeNull();
        typedResult.Error.Should().BeFalse();
        typedResult.Message.Should().Be("Successfully created");
        typedResult.Data.Should().NotBeNull();
        typedResult.Data.Id.Should().NotBe(Guid.Empty);
        typedResult.Data.Description.Should().NotBeNullOrWhiteSpace();
        Enum.IsDefined(typeof(CategoryPurpose), typedResult.Data.Purpose).Should().BeTrue();
    }

    [Fact]
    public async Task Update_ShouldUpdateCategory_WhenDataIsValid()
    {
        var category = new Category { Id = Guid.NewGuid(), Description = "Groceries", Purpose = CategoryPurpose.Expense };

        var response = new Response<Category>().ResponseSuccess("Successfully updated", category);
        _categoryRepositoryMock.Setup(r => r.Update(category)).ReturnsAsync(response);

        var result = await _categoryService.Update(category);
        var typedResult = result as Response<Category>;

        typedResult.Should().NotBeNull();
        typedResult.Error.Should().BeFalse();
        typedResult.Message.Should().Be("Successfully updated");
        typedResult.Data.Should().NotBeNull();
        typedResult.Data.Id.Should().NotBe(Guid.Empty);
        typedResult.Data.Description.Should().NotBeNullOrWhiteSpace();
        Enum.IsDefined(typeof(CategoryPurpose), typedResult.Data.Purpose).Should().BeTrue();
    }

    [Fact]
    public async Task Delete_ShouldReturnSuccess_WhenCategoryExists()
    {
        var category = new Category { Id = Guid.NewGuid(), Description = "Entertainment", Purpose = CategoryPurpose.Expense };

        _categoryRepositoryMock.Setup(r => r.GetById(category.Id)).ReturnsAsync(category);

        // ARRANGER RESPONSE
        Response response = new Response();

        response.Error = false;
        response.Message = "Successfully deleted";

        _categoryRepositoryMock.Setup(r => r.Delete(category.Id)).ReturnsAsync(response);

        var result = await _categoryService.Delete(category.Id);

        result.Should().NotBeNull();
        result.Error.Should().BeFalse();
        result.Message.Should().Be("Successfully deleted");
    }
}
