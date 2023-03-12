const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/index");
require("./config/database");
require("./config/passport");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

const server = app.listen(4000, () =>
  console.log("Server listening on port 4000")
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("nueva conexion exitosa " + socket.id);
  socket.on("message", (mensaje) => {
    if (mensaje === "nuevo mensaje") {
      io.sockets.emit("message", "refetch");
    }
    if (mensaje.includes("escribiendo")) {
      socket.broadcast.emit("message", mensaje);
    }
    if (mensaje == "borrado") {
      io.sockets.emit("message", "refetch");
    }
  });
});
