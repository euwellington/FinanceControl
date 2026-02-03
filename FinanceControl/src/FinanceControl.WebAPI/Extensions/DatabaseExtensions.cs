using FinanceControl.Models.DataBase;
using MySql.Data.MySqlClient;

namespace FinanceControl.WebAPI.Extensions;

public static class DatabaseExtension
{
    public static IServiceCollection InjectDataBases(this IServiceCollection services)
    {
        #region MySQL
        var hostName = Environment.GetEnvironmentVariable("MYSQL_SERVER") ?? "";
        var databaseName = Environment.GetEnvironmentVariable("MYSQL_DB") ?? "";
        var port = Environment.GetEnvironmentVariable("MYSQL_PORT") ?? "";
        var user = Environment.GetEnvironmentVariable("MYSQL_USER") ?? "";
        var password = Environment.GetEnvironmentVariable("MYSQL_PASS") ?? "";
        services.AddScoped(x => new MySqlConnection($"Server={hostName};Port={port};Database={databaseName};Uid={user};Pwd={password};"));
        #endregion

        #region MongoDB
        var mongoDatabase = Environment.GetEnvironmentVariable("MONGODB_DATABASE");
        var mongoDBIP = Environment.GetEnvironmentVariable("MONGODB_IP");
        var mongoDBPort = Environment.GetEnvironmentVariable("MONGODB_PORT");
        var mongoDBUser = Environment.GetEnvironmentVariable("MONGODB_USER");
        var mongoDBPass = Environment.GetEnvironmentVariable("MONGODB_PASS");
        var mongDbCollectionLogs = Environment.GetEnvironmentVariable("MONGODB_COLLECTION_LOGS") ?? "Logs";
        var connectionString = $"mongodb://{mongoDBUser}:{mongoDBPass}@{mongoDBIP}:{mongoDBPort}";

        if (string.IsNullOrEmpty(mongoDBUser) && string.IsNullOrEmpty(mongoDBPass))
            connectionString = $"mongodb://{mongoDBIP}:{mongoDBPort}";

        services.AddSingleton(new MongoDbSettings(connectionString, mongoDatabase, mongDbCollectionLogs));
        #endregion

        return services;
    }
}
