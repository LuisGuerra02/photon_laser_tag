const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
let wss;

const startWebSocket = (port) => {
    wss = new WebSocket.Server({noServer: true});

    if (!server.listening) {
        server.listen(port);
    }
}

const updateGameAction = async (data) => {
    wss.on("connection", (ws) => {
        ws.send(data);
    })
}

// Fix for refreshing client
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    })
})

module.exports = {
    startWebSocket,
    updateGameAction,
}