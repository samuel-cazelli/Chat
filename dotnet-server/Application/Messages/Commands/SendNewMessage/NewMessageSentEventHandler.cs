using ChatServer.Application.Messages.Commands;
using ChatServer.Application.Abstractions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ChatServer.Application.Messages.Commands.SendNewMessage
{
    public class NewMessageSentEventHandler : INotificationHandler<NewMessageSentEvent>
    {

        private IRealTimeChatService RealTimeChatService { get; set; }

        public NewMessageSentEventHandler(IRealTimeChatService realTimeService)
        {
            this.RealTimeChatService = realTimeService;
        }


        public Task Handle(NewMessageSentEvent notification, CancellationToken cancellationToken)
        {
            RealTimeChatService.BroadcastMessage(notification.Message);

            return Task.CompletedTask;
        }
    }
}
