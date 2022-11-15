/*using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class Data
    {
        public int id { get; set; }
        [Required]
        public int timestamp { get; set; }
        [Required]
        public float speed { get; set; }

        public static int globalID;

        public Data(int _timestamp, float _speed)
        {
            this.timestamp = _timestamp;
            this.speed = _speed;
            this.id = Interlocked.Increment(ref globalID);
        }
    }
}*/