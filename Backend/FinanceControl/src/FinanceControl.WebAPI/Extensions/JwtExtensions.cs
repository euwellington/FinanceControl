using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FinanceControl.WebAPI.Extensions;

public static class JwtExtension
{
    public static IServiceCollection AddJwt(this IServiceCollection service)
    {

        // Configura o Swagger para usar autenticação JWT

        service.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Bearer Authentication with JWT Token",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });

            options.OperationFilter<AddSwaggerService>();

        });


        service.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidAudience = Environment.GetEnvironmentVariable("JWTSETTINGS_VALIDAUDIENCE"),
                ValidIssuer = Environment.GetEnvironmentVariable("JWTSETTINGS_VALIDISSUER"),
                IssuerSigningKeys = new List<SecurityKey>
                    {
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JTW_SECRET_KEY_SERVICE_WEBAPI") ?? "")),
                    },
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.Zero
            };
        });

        return service;

    }
}

public class AddSwaggerService : IOperationFilter
{

    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var actionMetadata = context.ApiDescription.ActionDescriptor.EndpointMetadata;
        var isAuthorized = actionMetadata.Any(metadataItem => metadataItem is AuthorizeAttribute);
        var allowAnonymous = actionMetadata.Any(metadataItem => metadataItem is AllowAnonymousAttribute);

        if (!isAuthorized || allowAnonymous)
        {
            return;
        }
        if (operation.Parameters == null)
            operation.Parameters = new List<OpenApiParameter>();

        operation.Security = new List<OpenApiSecurityRequirement>();


        var security = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    }, new List<string>()
                }
            };
        operation.Security.Add(security);
    }
}