const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("newChat", "채팅방에 들어오신것을 환영합니다.");

  socket.on("to server", (msg) => {
    io.broadcast.emit("to client", msg);
    console.log(msg);
  });
});

console.log("서버 오픈");
io.listen(3001);
