// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:80");

// Connection Established
socket.addEventListener("open", (event) => {
  socket.send("Connected!");
});

// Listener
socket.addEventListener("message", (event) => {
  console.log("Server sent: ", event.data);
});