using System;
using System.Collections.Generic;
using System.Text;

namespace ChatServer.Application.Messages.Dto
{
    public class MessageDto
    {

        public MessageDto(Int32 id, String nick, String content, Boolean isMessageMine)
        {
            this.Id = id;
            this.Nick = nick;
            this.Content = content;
            this.IsMessageMine = isMessageMine;

        }

        public Int32 Id { get; set; }

        public String Nick { get; set; }

        public String Content { get; set; }

        public bool IsMessageMine { get; set; }

    }
}
