using FinanceControl.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace FinanceControl.Services.Validation;

public class JwtValidation
{
    public Response JtwToken(People people, Guid service)
    {
        Response response = new();

        var security = CheckService(service.ToString());
        if (security.Error) return security;

        var key = Encoding.ASCII.GetBytes(security.Message);

        var jwtSettings = new
        {
            Secrete = security.Message,
            ValidAudience = Environment.GetEnvironmentVariable("JWTSETTINGS_VALIDAUDIENCE"),
            ValidIssuer = Environment.GetEnvironmentVariable("JWTSETTINGS_VALIDISSUER"),
            ExpireInHours = TimeExpiration(service.ToString())
        };

        var claims = new List<Claim>();
        AddClaimIfNotNull(claims, "Id", people?.Id.ToString());
        AddClaimIfNotNull(claims, "Name", people?.Name.ToString());

        var identityClaims = new ClaimsIdentity();
        identityClaims.AddClaims(claims);

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
        {
            Issuer = jwtSettings.ValidIssuer,
            Audience = jwtSettings.ValidAudience,
            Expires = jwtSettings.ExpireInHours,
            SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Subject = identityClaims,
        });

        response.Message = tokenHandler.WriteToken(token);
        response.Error = false;
        return response;
    }

    private static void AddClaimIfNotNull(List<Claim> claims, string type, string value)
    {
        if (!string.IsNullOrEmpty(value))
            claims.Add(new Claim(type, value));
    }

    private static Response CheckService(string service)
    {
        Response response = new()
        {
            Message = "Service not found",
            Error = true
        };

        string[,] validationsAndKey = new string[,]
        {
                { Environment.GetEnvironmentVariable("VALIDATION_SERVICE_WEBAPI"), Environment.GetEnvironmentVariable("JTW_SECRET_KEY_SERVICE_WEBAPI") },
        };

        for (int count = 0; count <= 3; count++)
        {
            if (validationsAndKey[count, 0] == service.ToUpper())
            {
                response.Message = validationsAndKey[count, 1];
                response.Error = false;
                return response;
            }
        }

        return response;
    }

    private static DateTime TimeExpiration(string service)
    {
        DateTime expire = DateTime.Now;
        string[,] validationsAndKey = new string[,]
        {
                { Environment.GetEnvironmentVariable("VALIDATION_SERVICE_WEBAPI"), Environment.GetEnvironmentVariable("JWTSETTINGS_EXPIREINHOURS_WEBAPI") },
        };
        for (int count = 0; count <= 3; count++)
        {
            if (validationsAndKey[count, 0] == service.ToUpper())
            {
                expire = expire.AddHours(double.Parse(validationsAndKey[count, 1]));
                return expire;
            }
        }
        return expire;
    }
}