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

const server = app.listen(4000, '0.0.0.0', () =>
  console.log("Server listening on port 4000")
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname + "/client/build/index.html"))
  })
}

const io = socket(server, {
  cors: {
    origin: "https://turno-test.onrender.com/",
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
