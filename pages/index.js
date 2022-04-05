import React, { useState, useEffect } from "react";
import useChat from "../hooks/useChat";
import ListItem from "../components/ListItem";

export default function Home() {
  const [isIn, setIsIn] = useState(false);
  const [isName, setIsName] = useState(false);
  const { socket, messages, sendMessage, handleName } = useChat();

  useEffect(() => {
    if (isIn) {
      socket.connect();
    } else {
      setIsIn(true);
    }

    return () => {
      socket.disconnect();
    };
  }, [isIn]);

  return (
    <div>
      <p>chat server</p>
      <ul>
        {messages.map((msg, idx) => (
          <ListItem key={idx} message={msg} />
        ))}
      </ul>
      <input
        disabled={!isName}
        placeholder={isName ? "메시지를 입력하세요." : "이름을 정하세요."}
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      ></input>
      <input
        disabled={isName}
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            handleName(e.target.value);
            setIsName(true);
            e.target.value = "";
          }
        }}
      ></input>
    </div>
  );
}
