using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ChatServer.Code.Db.Models
{
    public class Message
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("nick")]
        public string Nick { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

    }
}
