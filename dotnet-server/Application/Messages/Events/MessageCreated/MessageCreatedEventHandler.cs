using ChatServer.Application.Messages.Commands;
using ChatServer.Application.Abstractions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ChatServer.Application.Messages.Events.MessageCreated
{
    public class MessageCreatedEventHandler : INotificationHandler<MessageCreatedEvent>
    {

        private IRealTimeChatService RealTimeChatService { get; set; }

        public MessageCreatedEventHandler(IRealTimeChatService realTimeService)
        {
            this.RealTimeChatService = realTimeService;
        }


        public Task Handle(MessageCreatedEvent notification, CancellationToken cancellationToken)
        {
            RealTimeChatService.BroadcastMessage(notification.Message);

            return Task.CompletedTask;
        }
    }
}
