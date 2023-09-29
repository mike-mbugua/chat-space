const { log } = require("console");
const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;
let users = [];
let connections = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // setting the connection
  connections.push(socket);
  console.log(`connected: ${connections.length} sockets connected`);

  // the disconnection
  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket));
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  //   send message
  socket.on("send message", (data) => {
    io.emit("new message", { msg: data });
  });
});

http.listen(port, () => {
  console.log(`http running on port ${port} .....`);
});
