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
        IdentityModelEventSource.ShowPII = true;

        services.AddControllers()
            .AddNewtonsoftJson(options =>
                options.SerializerSettings.Converters.Add(new StringEnumConverter()));

        services.AddEndpointsApiExplorer();

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

            var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });

        services.AddRouting(options => options.LowercaseUrls = true);

        services.AddInjections();
        services.AddJwt();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.AddAuthorization();

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

        services.AddSignalR();

        return services;
    }

    private static void AddInjections(this IServiceCollection services)
    {
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

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
        app.UseCors("AllowAll");

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<HubSettings>("hub");
        });

        return app;
    }
}