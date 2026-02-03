using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Paramaters
{
    public class PeopleModel
    {
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Email { get; set; } = string.Empty;


        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
