using ChatServer.Application.Messages.Dto;
using ChatServer.Domain.Entities;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ChatServer.Application.Abstractions
{
    public interface IRealTimeChatService
    {
        static ConcurrentDictionary<string, string> Users { get; set; }

        void OnConnect();

        void OnDisconnected(string connectionId);

        KeyValuePair<bool, string> LogIn(string nick, string connectionId);

        void LogOut(string connectionId);

        void SendMessage(string message, string connectionId);

        List<MessageDto> GetMessages(Int32 startId, string connectionId);

        void BroadcastMessage(Message message);

    }
}
