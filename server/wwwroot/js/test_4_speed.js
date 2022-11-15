"use strict";
function toHHMMSS(time) {
    var sec_num = time;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + String(seconds).substring(0,5);
}

Vue.component('gauge', {
    props: ['value', 'speed', 'background'],
    computed: {
        style() {
            return { height: this.speed };
        },
        style2() {
            return { transformOrigin: "50% 50%", transform: 'rotate(' + (245 + this.value * 230) + 'deg)' };
        },
    },

    template: `
    <svg width="410px" height="410px">
        <circle r="200" cx="50%" cy="50%" fill="none" stroke="#dcdde1" stroke-width="8" />
        <polygon points="205,205 0,300 0,410 410,410 410,300"  fill="#36393f" />
        <image :xlink:href="background" x="12" y="10" height="390px" width="390px"/>
        <polygon points="205,10 220,205 190,205" :style="style2" fill="#b8544b" />
        <text x="50%" y="350" font-family="sans-serif" font-size="85px" text-anchor="middle" fill="#dcdde1">{{this.speed.toFixed(0)}}</text>
        <circle r="30" cx="50%" cy="50%" fill="#36393f" stroke="#dcdde1" stroke-width="7"/>
        <rect x="50%" y="100%" height="150" fill="#b8544b" width="5" :style="style" />
    </svg >`
}),

Vue.component('bar', {
    props: ['value','color'],
    computed: {
        style() {
            return {height: this.value+"%", y: 100-this.value+"%", fill: this.color };
        },
    },

    template: `
    <svg width="75" height="200">
        <rect width="100%" height="100%" style="fill:#dcdde1;" ></rect>
        <rect id="test" width="100%" height="100%" y=0% :style="style" fill="green"  ></rect>
    </svg >`,

})

Vue.component('gear', {
    props: ['value','gear','color'],
    computed: {
        style() {
            return {fill: this.color};
        },
    },

    template: `
    <svg height="200" width="200">
        <circle cx="50%" cy="50%" r="95" stroke="#39AB87" stroke-width="10" fill="none" />
        <text x="49%" y="147" font-family="sans-serif" font-size="140px" text-anchor="middle" :style="style" fill="#39AB87">{{this.gear}}</text>
    </svg>`
})

Vue.component('stearing', {
    props: ['value'],
    computed: {
        style() {
            return { transformOrigin: "50% 50%", transform: 'rotate('+ this.value + 'deg)'};
        },
    },

    template: `
    <svg height="200" width="200" :style="style">
        <circle cx="50%" cy="50%" r="92" stroke="#dcdde1" stroke-width="16" fill="none" />
        <circle cx="50%" cy="50%" r="28" fill="#dcdde1" />
	    <rect width="100%" height="16" y="92"" style="fill:#dcdde1;" ></rect>
        <rect width="16" height="50%" x="92" y="50%"" style="fill:#dcdde1;" ></rect>
    </svg>`
})

new Vue({
    el: '#app',
    template: `
<span>
    <!-- <h1 style="color:#dcdde1;">Speed {{speed.toFixed(0)}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">RPM {{rpm.toFixed(0)}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">Break {{breaks}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">Accel {{accel}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">Clutch {{clutch}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">HBreak {{hbreak}}</h1> -->
    <!-- <h1 style="color:#dcdde1;">Gear {{gear}}</h1> --> 


        
   <!-- <div class="row" style="margin-top: 25px;">
        <div class="col-sm-3">
            <h2 style="color:#dcdde1;">Best Lap: {{timebestlap}}</h2>
        </div>
        <div class="col-sm-3">
            <h2 style="color:#dcdde1;">Last Lap: {{timelastlap}}</h2>
        </div>
        <div class="col-sm-3">
            <h2 style="color:#dcdde1;">Curr Lap: {{timecurrentlap}}</h2>
        </div>
        <div class="col-sm-3">
            <h2 style="color:#dcdde1;">Race Time: {{timerace}}</h2>
        </div>
    </div> -->

    <div class="row" style="margin-top: 25px;">
        <div class="col-sm-6" align="center" style="margin: 50px 0px;">
            
        </div>
        <div class="col-sm-6" align="center" style="margin: 50px 0px;">
            
        </div>
    </div> 

    <div class="row">
        <div class="col-sm-4" align="center">
            <gauge :value="speedPercentage" :speed="speedkm" background="../images/tick.png" ></gauge>
        </div>
        <div class="col-sm-4" align="center">
            <gauge :value="rpmPercentage" :speed="rpmreturn" background="../images/ticks.png" ></gauge>
        </div>
        <div class="col-sm-4" align="center">
            <h1 style="color:#dcdde1;">Pos: {{racepos}}</h1>
            <h2 style="color:#dcdde1;">Race Time: {{timerace}}</h2>
            <h2 style="color:#dcdde1;">Best Lap: {{timebestlap}}</h2>
            <h2 style="color:#dcdde1;">Last Lap: {{timelastlap}}</h2>
            <h2 style="color:#dcdde1;">Curr Lap: {{timecurrentlap}}</h2>
        </div>
    </div>

    <div class="row" style="margin-top: 40px;">
        <div class="col-sm-4" align="center">
            <bar :value="clutchPercentage" :color="clutchColor"></bar>
            <bar :value="breaksPercentage" :color="breaksColor"></bar>
            <bar :value="accPercentage" :color="accColor"></bar>
        </div>
        <div class="col-sm-4" align="center">
            
            <gear :gear="gearreturn" :color="gearcolor"></gear>
        </div>
        <div class="col-sm-4" align="center">
            <stearing :value="stearingAngle"></stearing>
        </div>
    </div>
    
    <div class="row" style="margin-top: 40px;">
        <div class="col-sm-4" align="center">
            <h2 style="color:#dcdde1;">Power: {{power.toFixed(0)}} kW</h2>
            <h2 style="color:#dcdde1;">Torque: {{torque.toFixed(0)}} Nm</h2>
        </div>
        <div class="col-sm-4" align="center">
            
        </div>
        <div class="col-sm-4" align="center">
            
        </div>
    </div>

</span>`,
    data: {
        connected: false,
        speed: 0,
        power: 0,
        torque: 0,
        maxSpeed: 300,
        rpm: 0,
        maxrpm: 9000,
        breaks: 0,
        accel: 0,
        clutch: 0,
        hbreak: 2,
        gear: 1,
        stear: 0,
        racepos: 1,
        bestlap: 0,
        lastlap: 0,
        currentlap: 0,
        racetime: 0,
        messages: [],
        connection: null,
    },
    computed: {
        speedPercentage() {
            return Math.abs(this.speed) / this.maxSpeed;
        },

        speedometer() {
           
            return "test";
        },

        odometer() {
           
            return "tester";
        },

        clutchColor() {
            return "FAA61A";
        },

        accColor() {
            return "39AB87";
        },

        breaksColor() {
            return "B8544B";
        },

        speedkm() {
            return this.speed;
        },

        rpmreturn() {
            return this.rpm;
        },

        gearreturn() {
            //return this.gear;
            if (this.gear < 1) {
                return "R";
            } else { return this.gear };
        },

        gearcolor() {
            if (this.gear < 1) {
                return "B8544B";
            } else { return "39AB87"};
        },
        timerace() {
            return toHHMMSS(this.racetime)
        },
        timelastlap() {
            return toHHMMSS(this.lastlap)
        },
        timebestlap() {
            return toHHMMSS(this.bestlap)
        },
        timecurrentlap() {
            return toHHMMSS(this.currentlap)
        },
        rpmPercentage() {
            //return this.rpm / this.maxrpm;
            return this.rpm / 9000;
        },
        accPercentage() {
            return (this.accel / 255)*100;
        },
        clutchPercentage() {
            return (this.clutch / 255) * 100;
        },
        breaksPercentage() {
            return (this.breaks / 255) * 100;
        },
        stearingAngle() {
            return (this.stear / 127) * 90;
        },
    },
    created: function () {
        fetch('/api/analyze/1').then(function(response) {
            console.log(response.text);
        });
        this.connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
        this.connection.start().then(() => {
            this.connected = true;
        }).catch(err => {
            return console.error(err.toString());
    });

        this.connection.on("ReceiveData", (data) => {
            this.speed = data.speed;
            this.power = data.power;
            this.maxrpm = data.maxrpm;
            this.torque = data.torque;
            this.rpm = data.rpm;
            this.breaks = data.breaks;
            this.accel = data.accel;
            this.clutch = data.clutch;
            this.hbreak = data.hbreak;
            this.gear = data.gear;
            this.stear = data.stear;
            this.racepos = data.racepos;
            this.bestlap = data.bestlap;
            this.lastlap = data.lastlap;
            this.currentlap = data.currentlap;
            this.racetime = data.racetime;
    });
    },
    methods: {
        send: function () {
            this.connection.invoke("SendMessage", this.username, this.message).catch(err => {
                return console.error(err.toString());
        });

            this.message = '';
        }
    }
});
