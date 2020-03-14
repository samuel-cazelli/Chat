using System;
using System.Collections.Generic;
using System.Text;

using ChatServer.Domain.Entities;
using MediatR;

namespace ChatServer.Application.Messages.Events.MessageCreated
{
    public class MessageCreatedEvent : INotification
    {
        public MessageCreatedEvent(Message message)
        {
            this.Message = message;
        }

        public Message Message { get; set; }

    }
}
