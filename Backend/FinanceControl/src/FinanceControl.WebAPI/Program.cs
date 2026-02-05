using FinanceControl.Models.DataBase;
using FinanceControl.Repositories;
using FinanceControl.Repositories.Base;
using FinanceControl.Repositories.Interfaces;
using FinanceControl.WebAPI.Extensions;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);

// Configurações básicas do ASP.NET
builder.Services.AddControllers()
    .AddJsonOptions(opts =>
        opts.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddServices();

var app = builder.Build();

// Configuração do logger de CRUD
using (var scope = app.Services.CreateScope())
{
    var provider = scope.ServiceProvider;

    var crudLogger = provider.GetRequiredService<ICrudLoggerRepository>();
    BaseRepository.ConfigureCrudLogger(crudLogger);

    var dbInitializer = provider.GetRequiredService<InitializeDB>();
}

// Inicializa o banco
using (var scope = app.Services.CreateScope())
{
    var dbInitializer = scope.ServiceProvider.GetRequiredService<InitializeDB>();
}

// Swagger só no desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
    });
}

app.UseContext(app.Environment);
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();
app.Run();