// Create WebSocket connection.
let portNumber = document.getElementById("portNumber");

if (portNumber == null) {
  var socket = new WebSocket("ws://" + location.hostname + ":3000");  
} else {
  var socket = new WebSocket("ws://" + location.hostname + ":" + portNumber);
}


// Listener
socket.addEventListener("message", (event) => {
  message = JSON.parse(event.data);

  playerFired = message[0].playerCodename;
  playerHit = message[1].playerCodename;

  updateLog(playerFired, playerHit);
  setScore(playerFired, 50);
  setScore(playerHit, -25);
});

document.addEventListener("stop-game", () => {
  socket.send("STOP THE COUNT!");
})