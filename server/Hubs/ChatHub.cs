using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Buffer = server.Models.Buffer;


namespace server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<ApplicationUser> _um;

        public ChatHub(ApplicationDbContext db, UserManager<ApplicationUser> um)
        {
            _db = db;
            _um = um;
        }
        
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task SendIp(string ip)
        {
            Console.WriteLine("SENDING IP");
            await Clients.All.SendAsync("ReceiveIp", ip);
        }
        
        public async Task SendData(LiveData data)
        {
            await Clients.All.SendAsync("ReceiveData", data);
        }
        
        public async Task SendBytes(byte[] bytes)
        {
            var data = new LiveData { 
                Timestamp = DateTime.UtcNow,
                MaxRpm = BitConverter.ToSingle(bytes, 8),
                Speed = BitConverter.ToSingle(bytes, 256)*3.6,
                Power = BitConverter.ToSingle(bytes, 260)/1000,
                Torque = BitConverter.ToSingle(bytes, 264),
                RPM = BitConverter.ToSingle(bytes, 16),
                BestLap = BitConverter.ToSingle(bytes, 296),
                LastLap = BitConverter.ToSingle(bytes, 300),
                CurrentLap = BitConverter.ToSingle(bytes, 304),
                RaceTime = BitConverter.ToSingle(bytes, 308),
                RacePos = (bytes[314]),
                Accel = (bytes[315]),
                Breaks = (bytes[316]),
                Clutch = (bytes[317]),
                Hbreak = (bytes[318]),
                Gear = (bytes[319]),
                Stear = (sbyte)bytes[320],

            };
            
            await Clients.All.SendAsync("ReceiveData", data);
            
        }
        
        public async Task StoreBytes(byte[] bytes)
        {
            var data = new LiveData { 
                Timestamp = DateTime.UtcNow,
                MaxRpm = BitConverter.ToSingle(bytes, 8),
                Speed = BitConverter.ToSingle(bytes, 256)*3.6,
                Power = BitConverter.ToSingle(bytes, 260)/1000,
                Torque = BitConverter.ToSingle(bytes, 264),
                RPM = BitConverter.ToSingle(bytes, 16),
                BestLap = BitConverter.ToSingle(bytes, 296),
                LastLap = BitConverter.ToSingle(bytes, 300),
                CurrentLap = BitConverter.ToSingle(bytes, 304),
                RaceTime = BitConverter.ToSingle(bytes, 308),
                RacePos = (bytes[314]),
                Accel = (bytes[315]),
                Breaks = (bytes[316]),
                Clutch = (bytes[317]),
                Hbreak = (bytes[318]),
                Gear = (bytes[319]),
                Stear = (sbyte)bytes[320],

            };
            
            _db.Add(data);
            await _db.SaveChangesAsync();
            
            string s = DateTime.UtcNow.ToString("yyyyMMdd-HHmmss.fff");
            //Console.WriteLine("Added buffer to database at {0}", s);
        }
    }
}