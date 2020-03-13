using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatServer.Application.Abstractions;
using ChatServer.Domain.Entities;
using MediatR;



namespace ChatServer.Application.Messages.Commands.SendNewMessage
{
    class SendNewMessageCommandsHandler : IRequestHandler<SendNewMessageCommand, Message>
    {

        private IChatServerDbContext DbContext { get; set; }
        
        private IMediator Mediator { get; set; }


        public SendNewMessageCommandsHandler(IChatServerDbContext dbContext, IMediator mediator)
        {
            this.DbContext = dbContext;
            this.Mediator = mediator;
        }

        public async Task<Message> Handle(SendNewMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Content = request.Content,
                Nick = request.Nick
            };

            DbContext.Messages.Add(message);

            var insertTask = DbContext.SaveChangesAsync(cancellationToken);

            insertTask.Wait();

            await Mediator.Publish(new NewMessageSentEvent(message), cancellationToken);

            return message;
        }
    }
}
