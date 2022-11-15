using System;
using Newtonsoft.Json;

namespace server.Models
{
    public class LiveData
    {
        public int Id { get; set; }
        
        [JsonProperty("timestamp")]
        public DateTime Timestamp { get; set; }

        [JsonProperty("maxrpm")]
        public double MaxRpm { get; set; }
        
        [JsonProperty("speed")]
        public double Speed { get; set; }

        [JsonProperty("power")]
        public double Power { get; set; }

        [JsonProperty("torque")]
        public double Torque { get; set; }

        [JsonProperty("rpm")]
        public double RPM { get; set; }

        [JsonProperty("breaks")]
        public double Breaks { get; set; }

        [JsonProperty("racepos")]
        public double RacePos { get; set; }

        [JsonProperty("bestlap")]
        public double BestLap { get; set; }

        [JsonProperty("lastlap")]
        public double LastLap { get; set; }

        [JsonProperty("currentlap")]
        public double CurrentLap { get; set; }

        [JsonProperty("racetime")]
        public double RaceTime { get; set; }

        [JsonProperty("accel")]
        public double Accel { get; set; }
        
        [JsonProperty("clutch")]
        public double Clutch { get; set; }

        [JsonProperty("hbreak")]
        public double Hbreak { get; set; }
        
        [JsonProperty("gear")]
        public double Gear { get; set; }
        
        [JsonProperty("stear")]
        public double Stear { get; set; }
    }
}