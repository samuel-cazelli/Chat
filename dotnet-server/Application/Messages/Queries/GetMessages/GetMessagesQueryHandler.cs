using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatServer.Application.Abstractions;
using ChatServer.Domain.Entities;
using MediatR;



namespace ChatServer.Application.Messages.Queries.GetMessages
{
    public class GetMessagesHandler : IRequestHandler<GetMessagesQuery, List<Message>>
    {

        private IChatServerDbContext DbContext { get; set; }


        public GetMessagesHandler(IChatServerDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<Message>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
        {

            var startId = request.StartId;

            if (startId == 0)
                startId = Int32.MaxValue;

            var messagesDb = await DbContext.Messages
                .Where(m => m.Id < startId)
                .OrderByDescending(m => m.Id)
                .Take(20)
                .OrderBy(m => m.Id)
                .ToListAsync(cancellationToken);

            return messagesDb;

        }

    }



}
