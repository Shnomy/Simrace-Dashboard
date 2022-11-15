using System.Collections.Generic;

namespace server.Models
{
    public class Buffer
    {
        public int Id { get; set; }
        public List<byte[]> Bytes;
        
        // Foreign key
        //public string OwnerId { get; set; }
        
        // Just for navigation
        //public ApplicationUser Owner { get; set; }
    }
}