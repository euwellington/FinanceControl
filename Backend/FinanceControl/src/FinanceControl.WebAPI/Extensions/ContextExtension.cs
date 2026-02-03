using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json.Converters;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using FinanceControl.Services.Hubs;

namespace FinanceControl.WebAPI.Extensions;

public static class ContextExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        // Mostra informações detalhadas de identidade para debug
        IdentityModelEventSource.ShowPII = true;

        // Configura controllers com suporte a enums como string no JSON
        services.AddControllers()
            .AddNewtonsoftJson(options =>
                options.SerializerSettings.Converters.Add(new StringEnumConverter()));

        services.AddEndpointsApiExplorer();

        // Configura Swagger (documentação da API)
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title = "Finance Control",
                Version = "v1",
                Description = "Personal finance control system.",
                Contact = new Microsoft.OpenApi.Models.OpenApiContact
                {
                    Name = "Wellington Felipe",
                    Email = "wellingotncontato02@gmail.com",
                    Url = new Uri("https://github.com/euwellington/FinanceControl")
                }
            });

            // Inclui comentários XML no Swagger
            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });

        services.AddRouting(options => options.LowercaseUrls = true); // URLs em minúsculo

        services.AddInjections(); // Injeta bancos, repositórios e serviços
        services.AddJwt();        // Configura JWT
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); // Mapeamento automático
        services.AddAuthorization(); // Autorização

        // Configura CORS global
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", builder =>
                builder.SetIsOriginAllowed(_ => true)
                       .AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowCredentials());
        });

        services.AddResponseCompression(opts =>
        {
            opts.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(
                new[] { "application/octet-stream" });
        });

        services.AddSignalR(); // Configura SignalR (websockets)

        return services;
    }

    private static void AddInjections(this IServiceCollection services)
    {
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        // Injeta bancos, repositórios e serviços
        services
            .InjectDataBases()
            .InjectRepositories()
            .InjectServices();
    }

    public static IApplicationBuilder UseContext(this IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Finance Control v1");
                c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });
        }

        app.UseResponseCompression();
        app.UseCors("AllowAll");      // Aplica CORS

        app.UseRouting();

        app.UseAuthentication(); // JWT
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers(); // Mapeia endpoints dos controllers
            endpoints.MapHub<HubSettings>("hub"); // Mapeia hub do SignalR
        });

        return app;
    }
}
