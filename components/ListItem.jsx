import React from "react";

function ListItem({ message }) {
  if (message.welcome) {
    return <li>{message.message}</li>;
  }
  return (
    <li>
      {message.senderName} : {message.message}
    </li>
  );
}

export default React.memo(ListItem);
