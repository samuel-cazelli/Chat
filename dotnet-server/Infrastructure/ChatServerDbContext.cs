using ChatServer.Application.Shared;
using ChatServer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatServer.Infrastructure
{
    public class ChatServerDbContext : DbContext, IChatServerDbContext
    {

        public ChatServerDbContext(DbContextOptions<ChatServerDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ChatServerDbContext).Assembly);
        }

        public DbSet<Message> Messages { get; set; }
    }
}
