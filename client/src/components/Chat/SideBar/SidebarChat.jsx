import "./SidebarChat.css";

import React from "react";
import { Avatar } from "@mui/material";

export default function SiderbarChat(props) {
  function createChat() {
    alert("creating...");
  }

  return !props.newChat ? (
    <div className="sidebarChat">
      <Avatar
        src={`https://avatars.dicebear.com/api/human/${props.userId}.svg`}
      />
      <div className="sidebarChat_info">
        <h2>{props.room}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
}
