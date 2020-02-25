using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using ChatServer.Code.Db;
using ChatServer.Code.Db.Models;

namespace ChatServer.Code.Hubs
{
    public class ChatHub : Hub
    {

        public ChatDbContext ChatDbContext { get; set; }

        public ChatHub(ChatDbContext dbContext)
        {
            this.ChatDbContext = dbContext;
        }

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
                var messageObj = new Message() { Nick = nick, Content = message, Date = DateTime.Now };

                ChatDbContext.Add(messageObj);
                ChatDbContext.SaveChanges();

                await Clients.All.SendAsync("NewMessage", messageObj);
            }
        }

        public List<Message> GetMessages(long startId = 0)
        {
            if (startId == 0)
                startId = long.MaxValue;

            var messages = ChatDbContext.Messages.Where(m => m.Id < startId).OrderByDescending(m => m.Id).Take(10).ToList();

            return messages.OrderBy(m => m.Id).ToList();
        }

    }

}
