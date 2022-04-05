const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("to server", (msg) => {
    socket.emit("to client", { ...msg });
    console.log(msg.message);
  });
});

console.log("서버 오픈");
io.listen(3001);
