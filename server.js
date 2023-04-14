let WebSocketServer = require("ws").Server;
let app = require("./back-end/routes.js");
let game = require("./back-end/game");
const tg = require("./back-end/trafficGenerator");
let server = require("http").createServer();
const dgram = require('dgram');
const trafficSocket = dgram.createSocket('udp4');

let wss = new WebSocketServer({
    server: server,
})

clients = [];

server.on("request", app.app);

const updateGameAction = (data) => {
    clients.forEach((client) => {
        client.send(data);
    })
}

wss.on("connection", (ws) => {
    clients.push(ws);
    ws.on("message", (msg) => {
        if (msg.toString() == "STOP THE COUNT!") {
            game.setGameState(false);
        }
    })
})

const listener = server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${listener.address().port}`);
})

// Traffic Socket
trafficSocket.bind(7501, '127.0.0.1', () => { // SET THE TRAFFIC GENERATOR PORT AND IP HERE
	console.log('UDP listening on 127.0.0.1:7501');
});

trafficSocket.on('message', (msg, rinfo) => {
	if (game.isRunning()) {

        players = app.getPlayers();
		let message = msg.toString().split(":").map(Number);

		// Process the received data here
		let playerFired = JSON.stringify(players[message[0]]);
		let playerHit = JSON.stringify(players[message[1]]);

		updateGameAction(`{ "0": ${playerFired}, "1": ${playerHit} }`);
		tg.startTraffic(players);
	}
});

trafficSocket.on('error', (err) => {
    console.error(`UDP server error:\n${err.stack}`);
    trafficSocket.close();
});

trafficSocket.on('close', () => {
    console.log('UDP server closed');
});