using ChatServer.Application.Abstractions;
using ChatServer.Application.Messages.Commands.CreateMessage;
using ChatServer.Application.Messages.Dto;
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

        public List<MessageDto> GetMessages(Int32 startId, string connectionId)
        {

            var currentUserNick = string.Empty;

            RealTimeChatUsersService.Users.TryGetValue(connectionId, out currentUserNick);
            
            var query = new GetMessagesQuery(startId);

            var messages = this.mediator.Send(query).Result;

            var messagesDto = messages.Select((m) => new MessageDto(m.Id, m.Nick, m.Content, currentUserNick == m.Nick));

            return messagesDto.ToList();

        }

        public void BroadcastMessage(Message message)
        {
            var currentUser = RealTimeChatUsersService.Users.Where(u => u.Value == message.Nick);

            var messageDto_ToUserWhoSentMessage = new MessageDto(message.Id, message.Nick, message.Content, true);

            if (currentUser.Any())
            {
                ChatHubContext.Clients.Client(currentUser.First().Key).SendAsync("NewMessage", messageDto_ToUserWhoSentMessage);
            }

            var messageDto_ToAllUsersExpetWhoSentMessage = new MessageDto(message.Id, message.Nick, message.Content, false);

            ChatHubContext.Clients.AllExcept(currentUser.First().Key).SendAsync("NewMessage", messageDto_ToAllUsersExpetWhoSentMessage);


        }
    }
}
