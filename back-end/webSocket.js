const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
let wss = new WebSocket.Server({server: app, path: "/action"});
let clients = [];
let gameRunning = true;

const startWebSocket = () => {

    gameRunning = true;

    if (!server.listening) {
        server.listen(process.env.PORT || 80);
        console.log("Websocket listening on port " + server.address().port);
    }
}

const updateGameAction = (data) => {
    clients.forEach((client) => {
        client.send(data);
    })
}

wss.on("connection", (ws) => {
    clients.push(ws);
    ws.on("message", (msg) => {
        console.log(msg.toString());

        if (msg.toString() == "STOP THE COUNT!") {
            gameRunning = false;
        }
    })
})

const isGameRunning = () => {
    return gameRunning;
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
    isGameRunning,
}