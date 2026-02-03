using FinanceControl.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities
{
    public class Auth
    {
        public Guid ServiceId { get; set; }
        private string _email = string.Empty;
        public string Email
        {
            get => _email;
            set => _email = value?.Trim() ?? string.Empty;
        }

        private string _password = string.Empty;
        public string Password
        {
            get => _password;
            set => _password = value?.Trim() ?? string.Empty; 
        }

        public object Serialize() => new { Auth = JsonSerializer.Serialize(this) };
    }
}
