using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Code.Db
{
    public class ChatDbContextFactory: IDesignTimeDbContextFactory<ChatDbContext>
    {

        public ChatDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ChatDbContext>();
            optionsBuilder.UseSqlServer("Data Source=blog.db");

            return new ChatDbContext(optionsBuilder.Options);
        }

    }
}
