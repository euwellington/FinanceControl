using FinanceControl.Repositories;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.Services;
using FinanceControl.Services.Interfaces;

namespace FinanceControl.WebAPI.Extensions;

public static class RepositoryExtension
{
    // Injecão de dependências para os repositórios
    public static IServiceCollection InjectRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPeopleRepository, PeopleRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IReportRepository, ReportRepository>();
        services.AddScoped<IDashboardRepository, DashboardRepository>();
        services.AddScoped<ICrudLoggerRepository, CrudLoggerRepository>();

        services.AddScoped<InitializeDB>();

        return services;
    }
}