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

app.get("/players", db.getPlayers);

app.listen(3000, () => {
	console.log("server started on port 3000");
});
