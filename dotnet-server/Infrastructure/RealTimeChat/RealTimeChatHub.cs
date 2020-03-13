using ChatServer.Application.Abstractions;
using ChatServer.Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Infrastructure.RealTimeChat
{
    public class RealTimeChatHub : Hub
    {

        private IRealTimeChatService RealTimeChatService { get; set; }

        public RealTimeChatHub(IRealTimeChatService realTimeChatService)
        {
            this.RealTimeChatService = realTimeChatService;
        }

        public override Task OnConnectedAsync()
        {
            RealTimeChatService.OnConnect();
            return base.OnConnectedAsync();
        }
        
        public override Task OnDisconnectedAsync(Exception exception)
        {
            RealTimeChatService.OnDisconnected(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public void SendMessage(string message)
        {
            RealTimeChatService.SendMessage(message, Context.ConnectionId);
        }

        public List<Message> GetMessages(Int32 startId = 0)
        {
            return RealTimeChatService.GetMessages(startId);
        }

        public KeyValuePair<bool, string> LogIn(string nick)
        {
            return RealTimeChatService.LogIn(nick, Context.ConnectionId);
        }

    }
}
