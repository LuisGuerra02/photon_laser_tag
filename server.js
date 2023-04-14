const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./back-end/DBConnection");
const dgram = require('dgram');
const { startWebSocket, updateGameAction, isGameRunning } = require("./back-end/webSocket");
const tg = require("./back-end/trafficGenerator");

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
	startWebSocket(process.env.PORT || 3000);
	console.log('');
	tg.startTraffic(players);
	res.render("action-screen/player-action", { players: players });
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`server started on port ${listener.address().port}`);
});

const server = dgram.createSocket('udp4');

server.bind(7501, '127.0.0.1', () => { // SET THE TRAFFIC GENERATOR PORT AND IP HERE
	console.log('UDP listening on 127.0.0.1:7501');
});

// Listen for incoming messages
server.on('message', (msg, rinfo) => {
	if (isGameRunning()) {
		message = JSON.parse(msg);

		let playerFired = message[0].playerCodename;
		let playerHit = message[1].playerCodename;

		updateGameAction(`{ "0": "${playerFired}", "1": "${playerHit}" }`);
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
