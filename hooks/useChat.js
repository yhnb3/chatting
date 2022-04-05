import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3001");
export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    socket.on("to client", (arg) => {
      console.log(arg);
      setMessages((messages) => [...messages, arg]);
    });
  }, []);

  const sendMessage = (msg) => {
    socket.emit("to server", {
      message: msg,
      senderId: socket.id,
      senderName: name,
      welcome: false,
    });
  };

  const handleName = (name) => {
    setMessages((messages) => [
      ...messages,
      {
        message: `${name}님 채팅방에 들어오신것을 환영합니다.`,
        senderId: socket.id,
        senderName: name,
        welcome: true,
      },
    ]);
    setName(name);
  };

  return { socket, messages, sendMessage, handleName };
}
