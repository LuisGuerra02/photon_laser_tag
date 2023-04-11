// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:80");

// Listener
socket.addEventListener("message", (event) => {
  message = JSON.parse(event.data);

  playerFired = message[0].playerCodename;
  playerHit = message[1].playerCodename;

  console.log(`${playerFired} hit ${playerHit}!`);
});

document.addEventListener("stop-game", () => {
  socket.send("STOP THE COUNT!");
})