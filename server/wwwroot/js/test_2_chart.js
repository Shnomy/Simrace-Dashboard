//Add some Vue here plzz
document.addEventListener('DOMContentLoaded', function() {
    // Real-time Chart Example written by Simon Brunel (Plunker: https://plnkr.co/edit/Imxwl9OQJuaMepLNy6ly?p=info)
    var samples = 100;
    var speed = 250;
    var values = [];
    var labels = [];
    var charts = [];
    var value = 0;

    values.length = samples;
    labels.length = samples;
    values.fill(0);
    labels.fill(0);

    var chart = new Chart(document.getElementById("chart"),
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: values,
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 2,
                        lineTension: 0.25,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: false,
                animation: {
                    duration: speed * 1.5,
                    easing: 'linear'
                },
                legend: false,
                scales: {
                    xAxes: [
                        {
                            display: false
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                max: 1,
                                min: -1
                            }
                        }
                    ]
                }
            }
        });

    //var connection = new signalR.HubConnection("hub");
    var connection = new signalR.HubConnection("hub");
    connection.on('Broadcast',
        function(sender, message) {
            values.push(message.value);
            values.shift();

            chart.update();
        });

    connection.start();
});