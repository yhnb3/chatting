import React from "react";

function ListItem({ message }) {
  return <li>{message}</li>;
}

export default React.memo(ListItem);
