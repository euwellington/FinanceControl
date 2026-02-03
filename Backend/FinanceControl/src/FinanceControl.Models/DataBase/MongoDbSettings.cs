using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.DataBase;

public class MongoDbSettings
{
    public MongoDbSettings(string connectionString, string databaseName, string collectionLogs)
    {
        ConnectionString = connectionString;
        DatabaseName = databaseName;
        CollectionLogs = collectionLogs;
    }

    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
    public string CollectionLogs { get; set; }
}