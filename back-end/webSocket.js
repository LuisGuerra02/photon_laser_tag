const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const dgram = require("dgram");

let wss = new WebSocket.Server({ noServer: true });
let clients = [];
let gameRunning = true;

const startWebSocket = (port) => {
  gameRunning = true;

  if (!server.listening) {
    server.listen(port);
  }

  // Create a UDP socket and listen for messages on a specific port
  const UDP_SERVER_PORT = 7502;
  const udpServer = dgram.createSocket("udp4");
  udpServer.on("message", (message, remote) => {
    // Parse the message and broadcast it to all connected clients
    const data = message.toString();
    clients.forEach((client) => {
      client.send(data);
    });
  });
  udpServer.bind(UDP_SERVER_PORT);
};

const updateGameAction = (data) => {
  clients.forEach((client) => {
    client.send(data);
  });
};

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("message", (msg) => {
    console.log(msg.toString());

    if (msg.toString() == "STOP THE COUNT!") {
      gameRunning = false;
    }
  });
});

const isGameRunning = () => {
  return gameRunning;
};

// Fix for refreshing client
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

module.exports = {
  startWebSocket,
  updateGameAction,
  isGameRunning,
};
