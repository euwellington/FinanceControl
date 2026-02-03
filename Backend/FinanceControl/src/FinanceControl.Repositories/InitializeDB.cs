using Dapper;
using FinanceControl.Repositories.Base;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;

namespace FinanceControl.Repositories
{
    public class InitializeDB : BaseRepository
    {
        public InitializeDB(MySqlConnection connection, ILogger<InitializeDB> logger, IHttpContextAccessor httpContextAccessor)
            : base(connection, logger, httpContextAccessor)
        {
            InitializeDatabase();
        }

        private void InitializeDatabase()
        {
            if (_mySqlConnection.State != System.Data.ConnectionState.Open)
                _mySqlConnection.Open();

            // Scripts de criação das tabelas do banco, incluindo chaves estrangeiras
            // Somente cria se ainda não existirem para não sobrescrever dados
            _mySqlConnection.Execute(@"
                CREATE TABLE IF NOT EXISTS categories (
                    Id CHAR(36) PRIMARY KEY,
                    Description VARCHAR(400) NOT NULL,
                    Purpose ENUM('Expense','Income','Both') NOT NULL,
                    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt DATETIME DEFAULT NULL,
                    DeletedAt DATETIME DEFAULT NULL
                );

                CREATE TABLE IF NOT EXISTS people (
                    Id CHAR(36) PRIMARY KEY,
                    Name VARCHAR(200) NOT NULL,
                    Age INT NOT NULL,
                    Email VARCHAR(100) NOT NULL,
                    Password VARCHAR(100) NOT NULL,
                    LastLogin DATETIME DEFAULT NULL,
                    LasLogout DATETIME DEFAULT NULL,
                    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt DATETIME DEFAULT NULL,
                    DeletedAt DATETIME DEFAULT NULL
                );

                CREATE TABLE IF NOT EXISTS transactions (
                    Id CHAR(36) PRIMARY KEY,
                    CategoryId CHAR(36) NOT NULL,
                    PersonId CHAR(36) NOT NULL,
                    Description VARCHAR(400) NOT NULL,
                    Amount DECIMAL(10,2) NOT NULL,
                    Type ENUM('Expense','Income') NOT NULL,
                    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt DATETIME DEFAULT NULL,
                    DeletedAt DATETIME DEFAULT NULL,
                    KEY `FK_PEOPLE_TRANSACTION_idx` (`PersonId`),
                    KEY `FK_CATEGORY_TRANSACTION_idx` (`CategoryId`),
                    CONSTRAINT `FK_CATEGORY_TRANSACTION` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`Id`),
                    CONSTRAINT `FK_PEOPLE_TRANSACTION` FOREIGN KEY (`PersonId`) REFERENCES `people` (`Id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
            ");
        }
    }
}
