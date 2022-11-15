//<script src="lib/chartjs/chart.js"></script>
//<script src="lib/signalr/dist/browser/signalr.js"></script>

"use strict";

new Vue({
    el: '#app',
    data: {
        loggedIn: false,
        connected: false,
        username: '',
        message: '',
        messages: [],
        connection: null
    },
    created: function () {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();

        this.connection.start().then(() => {
            this.connected = true;
    }).catch(err => {
            return console.error(err.toString());
    });

        this.connection.on("ReceiveData", (data) => {
            if (this.messages.length >= 10)
        this.messages.shift();

        this.messages.push(user + ': ' + message);
    });
    },
    methods: {
        login: function () {
            this.loggedIn = true;
            this.$nextTick(() => { $('#message').focus() });
        },
        send: function () {
            this.connection.invoke("SendMessage", this.username, this.message).catch(err => {
                return console.error(err.toString());
        });

            this.message = '';
        }
    }
});