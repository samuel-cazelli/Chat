using ChatServer.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatServer.Infrastructure.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {

        public void Configure(EntityTypeBuilder<Message> builder)
        {

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Nick)
                .IsRequired()
                .HasMaxLength(15);

            builder.Property(e => e.Content)
                .IsRequired()
                .HasColumnType("ntext");

        }


    }
}
