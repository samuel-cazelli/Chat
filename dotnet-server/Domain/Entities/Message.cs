using System;
using System.Collections.Generic;
using System.Text;

namespace ChatServer.Domain.Entities
{
    public class Message
    {

        public Int32 Id { get; set; }

        public String Nick { get; set; }

        public String Content { get; set; }

    }
}
