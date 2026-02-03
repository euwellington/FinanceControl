namespace FinanceControl.WebAPI.Extensions;

public static class CorsExtension
{
    public static IServiceCollection AddCors(this IServiceCollection services)
    {
        // Configura o CORS para permitir requisições de diferentes origens
        services.AddCors(options =>
        {
            options.AddPolicy(
                name: "AllowAll",
                builder =>
                {
                    builder.AllowAnyMethod(); // Permite qualquer método HTTP (GET, POST, etc)
                    builder.AllowAnyHeader(); // Permite qualquer header
                    builder.AllowCredentials(); // Permite envio de cookies/autenticação
                    builder.AllowAnyOrigin(); // Permite qualquer origem
                    builder.WithOrigins(           // Especifica origens permitidas (tem redundância com AllowAnyOrigin)
                        "http://localhost",
                        "http://localhost:3000",
                        "http://*",
                        "*");
                });
        });

        return services;
    }
}
