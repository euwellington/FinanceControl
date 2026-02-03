using FinanceControl.Services;
using FinanceControl.Services.Hubs;
using FinanceControl.Services.Interfaces;
using FinanceControl.Services.Validation;

namespace FinanceControl.WebAPI.Extensions;

public static class ServiceExtension
{
    public static IServiceCollection InjectServices(this IServiceCollection services)
    {
        services.AddScoped<IHubService, HubService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IPeopleService, PeopleService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<IReportService, ReportService>();

        services.AddScoped<JwtValidation>();
        services.AddHttpContextAccessor();

        return services;
    }
}