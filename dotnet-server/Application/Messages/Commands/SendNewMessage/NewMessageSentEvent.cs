using System;
using System.Collections.Generic;
using System.Text;

using ChatServer.Domain.Entities;
using MediatR;

namespace ChatServer.Application.Messages.Commands.SendNewMessage
{
    public class NewMessageSentEvent : INotification
    {
        public NewMessageSentEvent(Message message)
        {
            this.Message = message;
        }

        public Message Message { get; set; }

    }
}
