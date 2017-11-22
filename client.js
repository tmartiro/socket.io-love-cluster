//var http = require('http').createServer();
const io = require('socket.io-client');
const fs = require('fs');

var socket = io('http://localhost:4567', {transports: [ 'websocket' ]});

socket.on('connect', () => {
    console.log("connection is established ");
    fs.readFile("data.txt", {encoding: 'utf-8'}, function(err,data) {
        console.log(`--> ${data.length}`);
        socket.emit('message', data);
    });
});


socket.on("response", (response) => {
    console.log(`<-- ${response}`);
    socket.disconnect();
 });

