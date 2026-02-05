using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services;
using FinanceControl.Services.Hubs;
using FinanceControl.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace FinanceControl.Tests.TransactionTests
{
    public class TransactionServiceTests
    {
        private readonly Mock<ITransactionRepository> _transactionRepositoryMock;
        private readonly Mock<IPeopleRepository> _peopleRepositoryMock;
        private readonly Mock<ICategoryRepository> _categoryRepositoryMock;
        private readonly Mock<IHubService> _hubServiceMock;
        private readonly Mock<ILogger<TransactionService>> _loggerMock;
        private readonly TransactionService _transactionService;

        public TransactionServiceTests()
        {
            _transactionRepositoryMock = new Mock<ITransactionRepository>();
            _peopleRepositoryMock = new Mock<IPeopleRepository>();
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _hubServiceMock = new Mock<IHubService>();
            _loggerMock = new Mock<ILogger<TransactionService>>();

            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
            httpContextAccessorMock.Setup(h => h.HttpContext).Returns(new DefaultHttpContext());

            _transactionService = new TransactionService(
                _loggerMock.Object,
                httpContextAccessorMock.Object,
                _transactionRepositoryMock.Object,
                _peopleRepositoryMock.Object,
                _categoryRepositoryMock.Object,
                _hubServiceMock.Object
            );
        }

        [Fact]
        public async Task GetAll_ShouldReturnListOfTransactions()
        {
            var transaction1 = new Transaction { Id = Guid.NewGuid(), Description = "Grocery", Amount = 100, Type = TransactionType.Expense };
            var transaction2 = new Transaction { Id = Guid.NewGuid(), Description = "Salary", Amount = 5000, Type = TransactionType.Income };

            var list = new List<Transaction> { transaction1, transaction2 };
            var pagedResponse = new PagedResponse<Transaction>().ResponseSuccess("Transações recuperadas", list, list.Count, 1, 10);

            _transactionRepositoryMock.Setup(r => r.GetAll(It.IsAny<TransactionModel>())).ReturnsAsync(pagedResponse);

            var result = await _transactionService.GetAll(new TransactionModel());

            result.Should().NotBeNull();
            result.Data.Should().HaveCount(2);
        }

        [Fact]
        public async Task GetById_ShouldReturnTransaction_WhenExists()
        {
            var transaction = new Transaction { Id = Guid.NewGuid(), Description = "Rent", Amount = 1500, Type = TransactionType.Expense };
            _transactionRepositoryMock.Setup(r => r.GetById(transaction.Id)).ReturnsAsync(transaction);

            var result = await _transactionService.GetById(transaction.Id);

            result.Should().NotBeNull();
            result.Id.Should().Be(transaction.Id);
        }

        [Fact]
        public async Task Insert_ShouldCreateTransaction_WhenDataIsValid()
        {
            var person = new People { Id = Guid.NewGuid(), Age = 25 };
            var category = new Category { Id = Guid.NewGuid(), Purpose = CategoryPurpose.Expense };
            var transaction = new Transaction { Id = Guid.NewGuid(), Description = "Groceries", Amount = 200, Type = TransactionType.Expense, PersonId = person.Id, CategoryId = category.Id };

            _peopleRepositoryMock.Setup(p => p.GetById(person.Id)).ReturnsAsync(person);
            _categoryRepositoryMock.Setup(c => c.GetById(category.Id)).ReturnsAsync(category);
            _transactionRepositoryMock.Setup(t => t.Insert(transaction)).ReturnsAsync(new Response<Transaction>().ResponseSuccess("Created", transaction));
            _hubServiceMock.Setup(h => h.HandlerStatusTransitions(It.IsAny<HubTransaction>())).Returns(Task.CompletedTask);

            var result = await _transactionService.Insert(transaction);

            result.Should().NotBeNull();
            result.Error.Should().BeFalse();
        }

        [Fact]
        public async Task Update_ShouldUpdateTransaction_WhenDataIsValid()
        {
            var person = new People { Id = Guid.NewGuid(), Age = 25 };
            var category = new Category { Id = Guid.NewGuid(), Purpose = CategoryPurpose.Expense };
            var transaction = new Transaction { Id = Guid.NewGuid(), Description = "Utilities", Amount = 300, Type = TransactionType.Expense, PersonId = person.Id, CategoryId = category.Id };

            _peopleRepositoryMock.Setup(p => p.GetById(person.Id)).ReturnsAsync(person);
            _categoryRepositoryMock.Setup(c => c.GetById(category.Id)).ReturnsAsync(category);
            _transactionRepositoryMock.Setup(t => t.Update(transaction)).ReturnsAsync(new Response<Transaction>().ResponseSuccess("Updated", transaction));
            _hubServiceMock.Setup(h => h.HandlerStatusTransitions(It.IsAny<HubTransaction>())).Returns(Task.CompletedTask);

            var result = await _transactionService.Update(transaction);

            result.Should().NotBeNull();
            result.Error.Should().BeFalse();
        }

        [Fact]
        public async Task Delete_ShouldReturnSuccess_WhenTransactionExists()
        {
            var transaction = new Transaction { Id = Guid.NewGuid(), Description = "Subscription", Amount = 50, Type = TransactionType.Expense };

            Response response = new Response();

            response.Error = false;
            response.Message = "Successfully deleted";

            _transactionRepositoryMock.Setup(t => t.GetById(transaction.Id)).ReturnsAsync(transaction);
            _transactionRepositoryMock.Setup(t => t.Delete(transaction.Id)).ReturnsAsync(response);

            var result = await _transactionService.Delete(transaction.Id);

            result.Should().NotBeNull();
            result.Error.Should().BeFalse();
            result.Message.Should().Be("Successfully deleted");
        }

        [Fact]
        public async Task Insert_ShouldFailValidation_WhenPersonNotFound()
        {
            var transaction = new Transaction { Id = Guid.NewGuid(), Description = "Test", Amount = 100, Type = TransactionType.Expense, PersonId = Guid.NewGuid(), CategoryId = Guid.NewGuid() };

            _peopleRepositoryMock.Setup(p => p.GetById(transaction.PersonId)).ReturnsAsync((People)null);

            var result = await _transactionService.Insert(transaction);

            result.Should().NotBeNull();
            result.Error.Should().BeTrue();
            result.Message.Should().Contain("Pessoa não encontrada");
        }
    }
}