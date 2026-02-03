using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Repositories.Base;
using FinanceControl.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using System.Text.Json;
using MongoDB.Driver;
using FinanceControl.Models.DataBase;

namespace FinanceControl.Repositories;

public class CrudLoggerRepository : BaseRepository, ICrudLoggerRepository
{
    private readonly IMongoCollection<CrudLog> _logs;

    public CrudLoggerRepository(MySqlConnection mySqlConnection, ILogger<CrudLoggerRepository> logger, MongoDbSettings dataBaseSettings, IHttpContextAccessor httpContextAccessor) : base(mySqlConnection, logger, httpContextAccessor)
    {
        var client = new MongoClient(dataBaseSettings.ConnectionString);
        var dataBase = client.GetDatabase(dataBaseSettings.DatabaseName);
        _logs = dataBase.GetCollection<CrudLog>(dataBaseSettings.CollectionLogs);
    }

    public async Task LogAsync(
        CrudAction action,
        object entity,
        string entityId,
        string userId,
        string userName)
    {
        var options = new JsonSerializerOptions
        {
            WriteIndented = false, // sem indentação extra
            Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        };

        var log = new CrudLog
        {
            Action = action,
            EntityName = entity.GetType().Name,
            EntityId = entityId,
            EntityData = JsonSerializer.Serialize(entity, options),
            UserId = userId,
            UserName = userName
        };

        await _logs.InsertOneAsync(log);
    }
}