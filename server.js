const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// Serve static files
app.use(express.static("public"));

// REST API to "create" a new Jitsi room
app.get("/create-room", (req, res) => {
  // Make a unique room name (timestamp + random)
  const roomName = `myroom-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const roomURL = `https://meet.jit.si/${roomName}`;

  res.json({ url: roomURL });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});