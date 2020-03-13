using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using ChatServer.Application.Abstractions;
using ChatServer.Infrastructure.Db;
using ChatServer.Infrastructure.RealTimeChat;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace ChatServer.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {

            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddScoped<IChatServerDbContext>(provider => provider.GetService<ChatServerDbContext>());

            services.AddSingleton<RealTimeChatUsersService, RealTimeChatUsersService>();

            services.AddScoped<IRealTimeChatService, RealTimeChatService>();

            return services;
        }

    }
}
