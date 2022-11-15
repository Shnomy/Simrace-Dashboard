// Dette chartet kan zoome og scrolles, perfekt for analyse


var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function randomScalingFactor() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

function onRefresh(chart) {
    chart.config.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: randomScalingFactor()
        });
    });
}

var color = Chart.helpers.color;
var config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'RPM',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }, {
            label: 'Dataset 2 (cubic interpolation)',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            fill: false,
            cubicInterpolationMode: 'monotone',
            data: []
        }]
    },
    options: {
        title: {
            display: true,
            text: 'CHAAAARTSS'
        },
        scales: {
            xAxes: [{
                type: 'realtime',
                realtime: {
                    duration: 20000,
                    refresh: 1000,
                    delay: 2000,
                    onRefresh: onRefresh
                }
            }],
            yAxes: [{
                type: 'linear',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }
            }]
        },
        tooltips: {
            mode: 'nearest',
            intersect: false
        },
        hover: {
            mode: 'nearest',
            intersect: false
        },
        pan: {
            enabled: true,
            mode: 'x',
            rangeMax: {
                x: 4000
            },
            rangeMin: {
                x: 0
            }
        },
        zoom: {
            enabled: true,
            mode: 'x',
            rangeMax: {
                x: 20000
            },
            rangeMin: {
                x: 1000
            }
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data.forEach(function(dataObj) {
            dataObj.y = randomScalingFactor();
        });
    });

    window.myChart.update();
});

var colorNames = Object.keys(chartColors);
document.getElementById('addDataset').addEventListener('click', function() {
    var colorName = colorNames[config.data.datasets.length % colorNames.length];
    var newColor = chartColors[colorName];
    var newDataset = {
        label: 'Dataset ' + (config.data.datasets.length + 1),
        backgroundColor: color(newColor).alpha(0.5).rgbString(),
        borderColor: newColor,
        fill: false,
        lineTension: 0,
        data: []
    };

    config.data.datasets.push(newDataset);
    window.myChart.update();
});

document.getElementById('removeDataset').addEventListener('click', function() {
    config.data.datasets.pop();
    window.myChart.update();
});

document.getElementById('addData').addEventListener('click', function() {
    onRefresh(window.myChart);
    window.myChart.update();
});

document.getElementById('resetZoom').addEventListener('click', function() {
    window.myChart.resetZoom();
});




new Vue({
    el: '#app',
    template: `
<span>
    <h1 style="color:#dcdde1;">Speed</h1>
    <h2 style="color:#dcdde1;">{{speed}}</h2>
    <h1 style="color:#dcdde1;">Power</h1>
    <h2 style="color:#dcdde1;">{{power}}</h2>
    <h1 style="color:#dcdde1;">Torque</h1>
    <h2 style="color:#dcdde1;">{{torque}}</h2>
    <h1 style="color:#dcdde1;">Break</h1>
    <h2 style="color:#dcdde1;">{{breaks}}</h2>
    <h1 style="color:#dcdde1;">Accel</h1>
    <h2 style="color:#dcdde1;">{{accel}}</h2>
    <h1 style="color:#dcdde1;">Clutch</h1>
    <h2 style="color:#dcdde1;">{{clutch}}</h2>
    <h1 style="color:#dcdde1;">HBreak</h1>
    <h2 style="color:#dcdde1;">{{hbreak}}</h2>
    <h1 style="color:#dcdde1;">Gear</h1>
    <h2 style="color:#dcdde1;">{{gear}}</h2>
    <h1 style="color:#dcdde1;">Stear</h1>
    <h2 style="color:#dcdde1;">{{stear}}</h2>
    <h1 style="color:#dcdde1;">Race pos</h1>
    <h2 style="color:#dcdde1;">{{racepos}}</h2>
    <h1 style="color:#dcdde1;">Best Lap</h1>
    <h2 style="color:#dcdde1;">{{bestlap}}</h2>
    <h1 style="color:#dcdde1;">Last Lap</h1>
    <h2 style="color:#dcdde1;">{{lastlap}}</h2>
    <h1 style="color:#dcdde1;">Current Lap</h1>
    <h2 style="color:#dcdde1;">{{currentlap}}</h2>
    <h1 style="color:#dcdde1;">Race Time</h1>
    <h2 style="color:#dcdde1;">{{racetime}}</h2>
    <gauge :value="speedPercentage" style="margin: 25px 50px;"></gauge>
    <gauge :value="rpmPercentage" style="margin: 25px 50px;"></gauge>
</span>`,
    data: {
        connected: false,
        speed: 140,
        power: 100,
        torque: 100,
        maxSpeed: 240,
        rpm: 3500,
        maxRpm: 9000,
        breaks: 50,
        accel: 20,
        clutch: 10,
        hbreak: 2,
        gear: 60,
        stear: 20,
        racepos: 1,
        bestlap: 1,
        lastlap: 2,
        currentlap: 3,
        racetime: 4,
        messages: [],
        connection: null,
    },
    computed: {
        speedPercentage() {
            return Math.abs(this.speed) / this.maxSpeed;
        },
        rpmPercentage() {
            return this.rpm / this.maxRpm;
        }
    },
    created: function () {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        this.connection.start().then(() => {this.connected = true;})
            .catch(err => {
            return console.error(err.toString());
        });

        this.connection.on("ReceiveData", (data) => {
            this.speed = data.speed;
            this.power = data.power;
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
    }
});