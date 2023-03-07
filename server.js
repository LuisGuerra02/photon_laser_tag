const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./back-end/DBConnection");

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

app.get("/action", (req, res) => {
	console.log("Sent the following players to the action screen:");
	console.log(players);
	console.log(`PlayerCodename = ${players[16].playerCodename}`);

	res.render("action-screen/player-action", { players: players });

	/* In-Game Player JSON file Format
	 * {
	 * 		'index from entry table':
	 * 		{
	 * 			playerID: 'id',
	 * 			playerCodename: 'codename'
	 * 		},
	 * 		'index from entry table':
	 * 		{
	 * 			playerID: 'id',
	 * 			playerCodename: 'codename'
	 * 		}
	 * }
	*/
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

	res.redirect("/action");
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`server started on port ${listener.address().port}`);
});
