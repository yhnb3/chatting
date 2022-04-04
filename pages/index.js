import React, { useState } from "react";
import useChat from "../hooks/useChat";
import ListItem from "../components/ListItem";

export default function Home() {
  const { messages, sendMessage } = useChat();

  return (
    <div>
      <p>chat server</p>
      <ul>
        {messages.map((msg, idx) => (
          <ListItem key={idx} message={msg.msg} />
        ))}
      </ul>
      <input
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            console.log(e.target.value);
            sendMessage(e.target.value);
          }
        }}
      ></input>
    </div>
  );
}
