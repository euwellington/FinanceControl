using FinanceControl.Models.Entities;
using FinanceControl.Models.Enums;
using FinanceControl.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using MongoDB.Driver;
using FinanceControl.Models.DataBase;

namespace FinanceControl.Repositories;

public class CrudLoggerRepository : ICrudLoggerRepository
{
    private readonly IMongoCollection<CrudLog> _logs;
    private readonly ILogger<CrudLoggerRepository> _logger;

    public CrudLoggerRepository(
        ILogger<CrudLoggerRepository> logger,
        MongoDbSettings dataBaseSettings)
    {
        _logger = logger;
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
        try
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = false,
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao salvar log no MongoDB para a entidade {Entity}", entity.GetType().Name);
        }
    }
}