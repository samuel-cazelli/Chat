using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatServer.Application.Shared;
using ChatServer.Domain.Entities;
using MediatR;



namespace ChatServer.Application.Messages.Commands
{
    class SendNewMessageHandler : IRequestHandler<SendNewMessageCommand, Message>
    {

        private IChatServerDbContext DbContext { get; set; }


        public SendNewMessageHandler(IChatServerDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<Message> Handle(SendNewMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Content = request.Content,
                Nick = request.Nick
            };

            DbContext.Messages.Add(message);

            await DbContext.SaveChangesAsync(cancellationToken);

            return message;
        }
    }
}
