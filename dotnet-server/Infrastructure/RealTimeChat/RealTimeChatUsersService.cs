using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatServer.Infrastructure.RealTimeChat
{
    public class RealTimeChatUsersService
    {
        public static ConcurrentDictionary<string, string> Users { get; set; }

        public RealTimeChatUsersService()
        {
            Users = new ConcurrentDictionary<string, string>();
        }        
    }
}
