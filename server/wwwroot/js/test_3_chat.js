"use strict";

new Vue({
    el: '#app',
    data: {
        connected: false,
        message: '',
        messages: [],
        connection: null
    },
    created: function () {
        this.connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

        this.connection.start().then(() => {
            this.connected = true;
    }).catch(err => {
            return console.error(err.toString());
    });

        this.connection.on("ReceiveMessage", (user, message) => {
            if (this.messages.length >= 10)
        this.messages.shift();

        this.messages.push(message);
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
