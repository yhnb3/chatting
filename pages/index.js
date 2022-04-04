import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

// import ListItem from "../components/ListItem";

export default function Home() {
  console.log(1);
  const [cnt, setCnt] = useState(1);
  const socketOb = {};

  useEffect(() => {
    socketOb.a = io("ws://localhost:3001");
    socketOb.a.on("newChat", (arg) => console.log(arg));

    socketOb.a.on("to client", (arg) => console.log(arg));

    return () => {
      socketOb.a.close();
    };
  }, [socketOb]);
  return (
    <div>
      <p>chat server {cnt}</p>
      <button onClick={() => setCnt((prev) => prev + 1)}>+</button>
      {/* <ul>
        {msgList.map((msg, idx) => (
          <ListItem key={idx} message={msg} />
        ))}
      </ul> */}
      <input
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            socketOb.a.emit("to server", e.target.value);
            e.target.value = "";
          }
        }}
      ></input>
    </div>
  );
}
