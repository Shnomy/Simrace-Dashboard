using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace server.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Ip { get; set; }
        public string Port { get; set; }

        public List<Buffer> Buffers { get; set; }
    }
}