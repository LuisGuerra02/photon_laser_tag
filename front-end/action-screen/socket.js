let serverUrl = window.location.origin.replace(/^http/, 'ws');
let socket = new WebSocket(serverUrl);

socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server");
});

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);

  const playerFired = message[0].playerCodename;
  const playerHit = message[1].playerCodename;

  updateLog(playerFired, playerHit);
  setScore(playerFired, 50);
  setScore(playerHit, -25);
});

document.addEventListener("stop-game", () => {
  socket.send("STOP THE COUNT!");
});