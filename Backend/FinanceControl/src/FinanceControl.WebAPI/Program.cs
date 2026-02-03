using FinanceControl.Models.DataBase;
using FinanceControl.Repositories;
using FinanceControl.Repositories.Base;
using FinanceControl.WebAPI.Extensions;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
    .AddJsonOptions(opts =>
        opts.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddServices();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var provider = scope.ServiceProvider;

    var mySqlConnection = provider.GetRequiredService<MySqlConnection>();
    var logger = provider.GetRequiredService<ILogger<CrudLoggerRepository>>();
    var httpContextAccessor = provider.GetRequiredService<IHttpContextAccessor>();
    var dataBaseSettings = provider.GetRequiredService<MongoDbSettings>();

    var crudLogger = new CrudLoggerRepository(mySqlConnection, logger, dataBaseSettings, httpContextAccessor);
    BaseRepository.ConfigureCrudLogger(crudLogger);
}

using (var scope = app.Services.CreateScope())
{
    var dbInitializer = scope.ServiceProvider.GetRequiredService<InitializeDB>();
}

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