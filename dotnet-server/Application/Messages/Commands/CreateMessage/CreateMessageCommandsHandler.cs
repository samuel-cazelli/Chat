using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatServer.Application.Abstractions;
using ChatServer.Application.Messages.Events.MessageCreated;
using ChatServer.Domain.Entities;
using MediatR;



namespace ChatServer.Application.Messages.Commands.CreateMessage
{
    class CreateMessagesHandler : IRequestHandler<CreateMessageCommand, Message>
    {

        private IChatServerDbContext DbContext { get; set; }
        
        private IMediator Mediator { get; set; }


        public CreateMessagesHandler(IChatServerDbContext dbContext, IMediator mediator)
        {
            this.DbContext = dbContext;
            this.Mediator = mediator;
        }

        public async Task<Message> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Content = request.Content,
                Nick = request.Nick
            };

            DbContext.Messages.Add(message);

            var insertTask = DbContext.SaveChangesAsync(cancellationToken);

            insertTask.Wait();

            await Mediator.Publish(new MessageCreatedEvent(message), cancellationToken);

            return message;
        }
    }
}
