using FinanceControl.Models.Entities;
using FinanceControl.Models.Paramaters;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services;
using FinanceControl.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using FinanceControl.Tests.Utils;

namespace FinanceControl.Tests.PeopleTests;

public class PeopleServiceTests
{

    private readonly Mock<IPeopleRepository> _peopleRepositoryMock;
    private readonly Mock<ILogger<PeopleService>> _loggerMock;
    private readonly PeopleService _peopleService;

    public PeopleServiceTests()
    {
        _peopleRepositoryMock = new Mock<IPeopleRepository>();
        _loggerMock = new Mock<ILogger<PeopleService>>();

        var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        httpContextAccessorMock.Setup(h => h.HttpContext).Returns(new DefaultHttpContext());

        _peopleService = new PeopleService(_loggerMock.Object, httpContextAccessorMock.Object, _peopleRepositoryMock.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsListPerson()
    {
        // ARRANGER
        PeopleModel props = new PeopleModel();

        var peopleId1 = Guid.NewGuid();
        var peopleId2 = Guid.NewGuid();

        var peopleList = new List<People>
            {
                new People
                {
                    Id = peopleId1,
                    Name = "John Doe",
                    Email = "teste1@gmail.com",
                    Age = 25
                },
                new People
                {
                    Id = peopleId2,
                    Name = "Jane Smith",
                    Email = "teste2@gmail.com",
                    Age = 30
                }
            };

        var pagedResponse = new PagedResponse<People>().ResponseSuccess(
            message: "Pessoas recuperadas com sucesso",
            data: peopleList,
            totalRecords: peopleList.Count,
            page: 1,
            pageSize: 10
        );

        _peopleRepositoryMock.Setup(p => p.GetAll(props)).ReturnsAsync(pagedResponse);

        var results = await _peopleService.GetAll(props);

        results.Should().NotBeNull();
        results.Page.Should().Be(1);
        results.PageSize.Should().Be(10);
        results.TotalRecords.Should().Be(2);

        results.Data.Should().NotBeNull();
        results.Data.Should().BeAssignableTo<IEnumerable<People>>();
    }

    [Fact]
    public async Task GetById_ReturnsPerson_WhenPersonExists_EmailValidated()
    {
        // ARRANGER
        Guid peopleId = Guid.NewGuid();
        var people = new People
        {
            Id = peopleId,
            Name = "John Doe",
            Email = "teste@gmail.com",
            Age = 25
        };

        // ARRANGER
        _peopleRepositoryMock.Setup(p => p.GetById(peopleId)).ReturnsAsync(people);


        var result = await _peopleService.GetById(peopleId);


        result.Should().NotBeNull();
        result.Id.Should().Be(peopleId);
        result.Age.Should().Be(25);
        result.Name.Should().Be("John Doe");
        result.Email.Should().NotBeNull();

        Validation.IsValidEmail(result.Email).Should().BeTrue();
    }

    [Fact]
    public async Task Insert_ShouldCreatePerson_WhenDataIsValid()
    {
        // ARRANGER REQUEST
        People request = new People
        {
            Id = Guid.NewGuid(),
            Name = "John Doe",
            Email = "john.doe@example.com",
            Age = 25,
            Password = "Senha123"
        };

        request.Should().NotBeNull();
        request.Name.Should().NotBeNullOrWhiteSpace();
        request.Age.Should().BeGreaterThan(0);
        Validation.IsValidEmail(request.Email).Should().BeTrue();

        // ARRANGER RESPONSE
        Response<People> response = new Response<People>().ResponseSuccess("Successfully created", request);

        _peopleRepositoryMock.Setup(p => p.Insert(request)).ReturnsAsync(response);

        var result = await _peopleService.Insert(request);

        var typedResult = result as Response<People>;


        typedResult.Should().NotBeNull();
        typedResult.Message.Should().Be("Successfully created");
        typedResult.Error.Should().BeFalse();
        typedResult.Data?.Should().NotBeNull();
        typedResult.Data?.Id.Should().Be(request.Id);
    }


    [Fact]
    public async Task Update_ShouldUpdatePerson_WhenDataIsValid()
    {
        // ARRANGER REQUEST
        People request = new People
        {
            Id = Guid.NewGuid(),
            Name = "John Doe",
            Email = "john.doe@example.com",
            Age = 25,
            Password = "Senha123"
        };

        request.Should().NotBeNull();
        request.Name.Should().NotBeNullOrWhiteSpace();
        request.Age.Should().BeGreaterThan(0);
        Validation.IsValidEmail(request.Email).Should().BeTrue();

        // ARRANGER RESPONSE
        Response<People> response = new Response<People>().ResponseSuccess("Successfully updated", request);

        _peopleRepositoryMock.Setup(p => p.Update(request)).ReturnsAsync(response);

        var result = await _peopleService.Update(request);

        var typedResult = result as Response<People>;


        typedResult.Should().NotBeNull();
        typedResult.Message.Should().Be("Successfully updated");
        typedResult.Error.Should().BeFalse();
        typedResult.Data?.Should().NotBeNull();
        typedResult.Data?.Id.Should().Be(request.Id);
    }

    [Fact]
    public async Task Delete_ShouldUpdatePerson_WhenDataIsValid()
    {
        var peopleId = Guid.NewGuid();

        // ARRANGER REQUEST
        People request = new People
        {
            Id = peopleId,
            Name = "John Doe",
            Email = "john.doe@example.com",
            Age = 25,
            Password = "Senha123"
        };

        peopleId.Should().NotBe(Guid.Empty);

        // ARANGE GET BY ID
        _peopleRepositoryMock.Setup(p => p.GetById(peopleId)).ReturnsAsync(request);

        // ARRANGER RESPONSE
        Response response = new Response();

        response.Error = false;
        response.Message = "Successfully deleted";

        _peopleRepositoryMock.Setup(p => p.Delete(peopleId)).ReturnsAsync(response);

        var result = await _peopleService.Delete(peopleId);

        result.Should().NotBeNull();
        result.Message.Should().Be("Successfully deleted");
        result.Error.Should().BeFalse();
    }
}
