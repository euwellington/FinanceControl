using FinanceControl.Models.DataBase;
using MySql.Data.MySqlClient;

namespace FinanceControl.WebAPI.Extensions;

public static class DatabaseExtension
{
    public static IServiceCollection InjectDataBases(this IServiceCollection services)
    {
        // Configura as conexões com bancos SQL (MySQL) e NoSQL (MongoDB)

        #region MySQL
        // Pega as variáveis de ambiente do MySQL
        var hostName = Environment.GetEnvironmentVariable("MYSQL_SERVER") ?? "";
        var databaseName = Environment.GetEnvironmentVariable("MYSQL_DB") ?? "";
        var port = Environment.GetEnvironmentVariable("MYSQL_PORT") ?? "";
        var user = Environment.GetEnvironmentVariable("MYSQL_USER") ?? "";
        var password = Environment.GetEnvironmentVariable("MYSQL_PASS") ?? "";
        // Cria a conexão e adiciona ao container de serviços
        services.AddScoped(x => new MySqlConnection($"Server={hostName};Port={port};Database={databaseName};Uid={user};Pwd={password};"));
        #endregion

        #region MongoDB
        // Pega as variáveis de ambiente do MongoDB
        var mongoDatabase = Environment.GetEnvironmentVariable("MONGODB_DATABASE");
        var mongoDBIP = Environment.GetEnvironmentVariable("MONGODB_IP");
        var mongoDBPort = Environment.GetEnvironmentVariable("MONGODB_PORT");
        var mongoDBUser = Environment.GetEnvironmentVariable("MONGODB_USER");
        var mongoDBPass = Environment.GetEnvironmentVariable("MONGODB_PASS");
        var mongDbCollectionLogs = Environment.GetEnvironmentVariable("MONGODB_COLLECTION_LOGS") ?? "Logs";

        // Monta a string de conexão
        var connectionString = $"mongodb://{mongoDBUser}:{mongoDBPass}@{mongoDBIP}:{mongoDBPort}";
        // Se não tiver usuário e senha, conecta sem autenticação
        if (string.IsNullOrEmpty(mongoDBUser) && string.IsNullOrEmpty(mongoDBPass))
            connectionString = $"mongodb://{mongoDBIP}:{mongoDBPort}";

        // Adiciona as configurações do MongoDB como singleton
        services.AddSingleton(new MongoDbSettings(connectionString, mongoDatabase, mongDbCollectionLogs));
        #endregion

        return services;
    }
}
