const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    socket.join(data.roomId);
    socket.to(data.roomId).to(socket.id).emit("receive_message", data);
    // console.log(data);
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
    console.log("Disconnecting users...")
  });
});

http.listen(3001, (req, res) => {
  console.log("App is listening on port 3001");
});
