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

app.get("/", (req, res) => {
	res.render("splash-screen/splash");
});

app.get('/action', function(req, res) {
	res.render('action-screen/player-action.ejs');
});

app.get("/entry", async (req, res) => {
	if (req.query.id == undefined) {
		db.getPlayers(req, res);
	}
	else {
		const result = await db.getCodenameByID(req.query.id);
		res.json(result);
	}
});

app.post("/entry", (req, res) => {

	players = req.body;

	for (let i = 1; i < 31; i++) {
		if (players[i].playerID != '' && players[i].playerCodename != '') {
			db.setPlayers(players[i]);
		}
		else
		{
			delete players[i];
		}
	}

	res.render("splash-screen/splash");

	// TODO: Render Player Game (For now just delivering existing form)
	//res.render("player-screen/player-form", players);
});

let listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`server started on port ${listener.address().port}`);
});