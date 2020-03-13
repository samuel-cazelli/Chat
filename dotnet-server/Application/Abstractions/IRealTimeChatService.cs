﻿using ChatServer.Domain.Entities;
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

        List<Message> GetMessages(Int32 startId = 0);

        void BroadcastMessage(Message message);

    }
}
