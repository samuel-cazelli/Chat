using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatServer.Code.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatServer.Code.Db
{
    public class ChatDbContext : DbContext
    {

        public ChatDbContext(DbContextOptions options)
           : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }

    }
}
