namespace FinanceControl.WebAPI.Extensions;

public static class CorsExtension
{
    public static IServiceCollection AddCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(
                name: "AllowAll",
                builder =>
                {
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                    builder.AllowCredentials();
                    builder.AllowAnyOrigin();
                    builder.WithOrigins(
                        "http://localhost",
                        "http://localhost:3000",
                        "http://*",
                        "*");
                });
        });

        return services;
    }
}