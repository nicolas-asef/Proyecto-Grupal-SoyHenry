import "./SidebarChat.css";

import React from "react";
import { Avatar } from "@mui/material";

export default function SidebarChat(props) {
  function createChat() {
    alert("creating...");
  }

  return !props.newChat ? (
    // <Link to={'/chats/${props.chatId}'}>
    <div className="sidebarChat">
      <Avatar
        src={`https://avatars.dicebear.com/api/human/${props.chat}.svg`}
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
