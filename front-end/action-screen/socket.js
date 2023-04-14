// Create WebSocket connection.
const socket = new WebSocket("ws://localhost/action");

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