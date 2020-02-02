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
            var nick = string.Empty;

            Users.TryRemove(Context.ConnectionId, out nick);

            return base.OnDisconnectedAsync(exception);
        }

        private static readonly ConcurrentDictionary<string, string> Users = new ConcurrentDictionary<string, string>();

        public KeyValuePair<bool, string> LogIn(string nick)
        {
            var connectionId = Context.ConnectionId;

            var userWithSameNick = Users.Where(u => u.Value == nick);

            if (userWithSameNick.Count() != 0)
            {
                return new KeyValuePair<bool, string>(false, "Nick is already been used.");
            }

            Users.GetOrAdd(connectionId, nick);

            return new KeyValuePair<bool, string>(true, string.Empty);

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
