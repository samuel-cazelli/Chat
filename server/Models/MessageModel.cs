using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Models
{
    public class MessageModel
    {

        public MessageModel(ChatServer.Code.Db.Models.Message messageDb, string myNick)
        {
            this.Id = messageDb.Id;
            this.Nick = messageDb.Nick;
            this.Content = messageDb.Content;
            this.Date = messageDb.Date;
            
            this.IsMessageMine = messageDb.Nick == myNick;
        }


        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("nick")]
        public string Nick { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        [JsonProperty("isMessageMine")]
        public Boolean IsMessageMine { get; set; }



    }
}
