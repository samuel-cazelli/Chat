using System;
using System.Collections.Generic;
using System.Text;
using ChatServer.Domain.Entities;
using MediatR;

namespace ChatServer.Application.Messages.Queries.GetMessages
{
    public class GetMessagesQuery : IRequest<List<Message>>
    {
        public GetMessagesQuery(Int32 startId)
        {
            this.StartId = startId;
        }

        public Int32 StartId { get; set; }

    }
}
