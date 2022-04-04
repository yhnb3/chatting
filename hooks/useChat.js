import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("newChat", (arg) => console.log(arg));
    socket.current.on("to client", (arg) => {
      const newMsg = {
        ...arg,
        isMine: arg.senderId === socket.current.id,
      };
      setMessages((messages) => [...messages, newMsg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (msg) => {
    socket.current.emit("to server", { msg, senderId: socket.current.id });
  };

  return { messages, sendMessage };
}
