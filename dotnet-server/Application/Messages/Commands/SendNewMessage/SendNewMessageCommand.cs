using System;
using System.Collections.Generic;
using System.Text;
using ChatServer.Domain.Entities;
using MediatR;

namespace ChatServer.Application.Messages.Commands.SendNewMessage
{
    public class SendNewMessageCommand : IRequest<Message>
    {
        public SendNewMessageCommand(string nick, string message)
        {
            this.Nick = nick;
            this.Content = message;
        }

        public string Nick { get; set; }

        public string Content { get; set; }

    }
}
