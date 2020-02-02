using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Code.Hubs
{
    public class ChatHub : Hub
    {



        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        private static readonly ConcurrentDictionary<string, string> Users = new ConcurrentDictionary<string, string>();

        public void LogIn(string nick)
        {
            var connectionId = Context.ConnectionId;

            Users.GetOrAdd(connectionId, nick);
        }

        public async Task SendMessage(string message)
        {
            var nick = string.Empty;
            var connectionId = Context.ConnectionId;

            if (Users.TryGetValue(connectionId, out nick))
            {
                await Clients.All.SendAsync("NewMessage", $"@{nick} says: {message}");
            }
        }
    }

}
