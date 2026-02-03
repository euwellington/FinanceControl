using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;

namespace FinanceControl.Services.Hubs;

// Hub do SignalR para comunicação em tempo real
public class HubSettings : Hub
{
    public async Task JoinGroup(string groupName) => await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

    public async Task RemoveFromGroup(string groupName) => await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

    public async Task SendMessage(string userId, string mensagem) => await Clients.All.SendAsync("ReceiveMessage", userId, mensagem);

    public async Task RegisterUser(string userId) => await Groups.AddToGroupAsync(Context.ConnectionId, userId);

    public override Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        var userId = Context.UserIdentifier;
        return base.OnDisconnectedAsync(exception);
    }
}