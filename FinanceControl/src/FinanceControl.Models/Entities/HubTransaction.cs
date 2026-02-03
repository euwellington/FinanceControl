using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceControl.Models.Entities;

public class HubTransaction
{
    public People People { get; set; }
    public Category Category { get; set; }
    public Transaction Transaction { get; set; }
}