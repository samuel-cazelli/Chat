using ChatServer.Application.Abstractions;
using ChatServer.Application.Messages.Commands.CreateMessage;
using ChatServer.Application.Messages.Queries.GetMessages;
using ChatServer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ChatServer.Infrastructure.RealTimeChat
{
    public class RealTimeChatService : IRealTimeChatService
    {

        private IHubContext<RealTimeChatHub> ChatHubContext { get; set; }

        private IMediator mediator { get; set; }
        
        private RealTimeChatUsersService RealTimeChatUsersService { get; set; }

        
        public RealTimeChatService(IHubContext<RealTimeChatHub> chatHubContext, IMediator mediator, RealTimeChatUsersService realTimeChatUsersService)
        {
            this.RealTimeChatUsersService = realTimeChatUsersService;

            this.ChatHubContext = chatHubContext;
            this.mediator = mediator;
        }

        public void OnConnect()
        {
            
        }

        public void OnDisconnected(string connectionId)
        {
            LogOut(connectionId);
        }

        public KeyValuePair<bool, string> LogIn(string nick, string connectionId)
        {
            var userWithSameNick = RealTimeChatUsersService.Users.Where(u => u.Value == nick);

            if (userWithSameNick.Any())
            {
                return new KeyValuePair<bool, string>(false, "Nick is already been used.");
            }

            RealTimeChatUsersService.Users.GetOrAdd(connectionId, nick);

            return new KeyValuePair<bool, string>(true, string.Empty);
        }

        public void LogOut(string connectionId)
        {
            var nick = string.Empty;

            RealTimeChatUsersService.Users.TryRemove(connectionId, out nick);
        }

        public void SendMessage(string message, string connectionId)
        {
            var command = new CreateMessageCommand(RealTimeChatUsersService.Users[connectionId], message);

            this.mediator.Send(command);
        }

        public List<Message> GetMessages(Int32 startId = 0)
        {
            var query = new GetMessagesQuery(startId);

            return this.mediator.Send(query).Result;

        }

        public void BroadcastMessage(Message message)
        {
            ChatHubContext.Clients.All.SendAsync("NewMessage", message);
        }
    }
}
