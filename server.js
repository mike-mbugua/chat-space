const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;
let users = [];
let connections = [];

server.listen(port);
console.log(`Server running on port ${port} .....`);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
