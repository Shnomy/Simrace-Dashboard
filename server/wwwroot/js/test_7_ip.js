$(document).ready(function () {
    

    var app = new Vue({
        el: '#app',
        data: {
            Connecting: "Connected"
        },
        template:`
        <span>
        <div>
        <h3>{{Connecting}}</h3>
        </div>           
        </span>
        `,
        created: function() {
            fetch('/api/analyze/1').then(function(response) {
                return response.text().then(function(text) {
                    console.log(text);
                    const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
                    connection.start().then(() => {
                        connection.invoke("SendIp", text);
                        this.data.ip = text;
                        window.location.href = "/Home/Speed"
                    })
                        .catch(err => {
                            return console.error(err.toString());
                        });
                });
            });
        },
    });
});