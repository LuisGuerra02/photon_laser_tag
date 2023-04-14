const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./back-end/DBConnection");
const ws = require("./back-end/webSocket");
const tg = require("./back-end/trafficGenerator")
const dgram = require('dgram');

// Create a UDP socket
const server = dgram.createSocket('udp4');

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Directing Resource Requests
app.use(express.static(path.join(__dirname, "front-end")));
app.set("views", path.join(__dirname, "front-end"));

// Data Variables
let players = {};

// Website Paths
app.get("/", (req, res) => {
	res.render("splash-screen/splash");
});

app.get("/entry", async (req, res) => {
	if (req.query.id == undefined) {
		db.getPlayers(req, res);
	} else {
		const result = await db.getCodenameByID(req.query.id);
		res.json(result);
	}
});

app.post("/entry", (req, res) => {
	players = req.body;

	for (let i = 1; i < 31; i++) {
		if (players[i].playerID != "" && players[i].playerCodename != "") {
			db.setPlayers(players[i]);
		} else {
			delete players[i];
		}
	}

	res.redirect("/timer");
});

app.get("/timer", (req, res) => {
	res.render("countdown-screen/timer");
});

app.get("/action", (req, res) => {
	ws.startWebSocket(7502);
	console.log('');
	tg.startTraffic(players);
	res.render("action-screen/player-action", { players: players });
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`server started on port ${listener.address().port}`);
});

server.bind(7502, '54.243.129.215', () => { // SET THE TRAFFIC GENERATOR PORT AND IP HERE
	console.log('UDP listening on 54.243.129.215:7502');
});
  
// Listen for incoming messages
server.on('message', (msg, rinfo) => {
	if (ws.isGameRunning()) {
		let message = msg.toString().split(":").map(Number);

		// Process the received data here
		let playerFired = JSON.stringify(players[message[0]]);
		let playerHit = JSON.stringify(players[message[1]]);

		ws.updateGameAction(`{ "0": ${playerFired}, "1": ${playerHit} }`);
		tg.startTraffic(players);
	}
});

server.on('error', (err) => {
	console.error(`UDP server error:\n${err.stack}`);
	server.close();
});

// Close the socket when done
server.on('close', () => {
	console.log('UDP server closed');
});
