using FinanceControl.Models.Entities;
using FinanceControl.Services.Base;
using FinanceControl.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace FinanceControl.Services.Hubs;

public class HubService : BaseService, IHubService
{
    private readonly IHubContext<HubSettings> _hubContext;

    public HubService(
        ILogger<HubService> logger,
        IHttpContextAccessor httpContextAccessor,
        IHubContext<HubSettings> hubContext
    ) : base(logger, httpContextAccessor)
    {
        _hubContext = hubContext;
    }

    public async Task HandlerStatusTransitions(HubTransaction request)
    {
        // Pegamos todos os clientes conectados ao Hub
        // e enviamos uma mensagem para eles.

        // "Transaction" é o nome do método que os clientes precisam ter
        // para receber essa mensagem.  
        // O segundo parâmetro é o dado que será enviado (request).
        await _hubContext.Clients.All.SendAsync("Transaction", request);
    }

}
