using FinanceControl.Models.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FinanceControl.Models.Entities;

public class CrudLog
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public CrudAction Action { get; set; }

    public string UserId { get; set; }
    public string UserName { get; set; }

    public string EntityName { get; set; }
    public string EntityId { get; set; }

    [BsonRepresentation(BsonType.String)]
    public string EntityData { get; set; }

    public DateTime Timestamp { get; set; } = DateTime.Now;
}