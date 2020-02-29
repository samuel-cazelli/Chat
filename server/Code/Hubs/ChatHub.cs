using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using ChatServer.Code.Db;
using ChatServer.Code.Db.Models;
using ChatServer.Models;

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

                await Clients.All.SendAsync("NewMessage", new MessageModel(messageObj, nick));
            }
        }

        public List<MessageModel> GetMessages(long startId = 0)
        {
            if (startId == 0)
                startId = long.MaxValue;

            var messagesDb = ChatDbContext.Messages
                .Where(m => m.Id < startId)
                .OrderByDescending(m => m.Id)
                .Take(20)
                .ToList()
                .OrderBy(m => m.Id)
                .ToList();

            var nick = string.Empty;
            Users.TryGetValue(Context.ConnectionId, out nick);

            return messagesDb.Select(m => new MessageModel(m, nick)).ToList();
        }

    }

}
