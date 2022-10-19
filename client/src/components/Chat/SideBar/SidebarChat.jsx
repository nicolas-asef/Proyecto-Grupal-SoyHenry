import "./SidebarChat.css";

import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function SiderbarChat({host, guest, messages, authid, chatid}) {
  
  function createChat() {
    alert("creating...");
  }

  return (
    <Link to={`/chat/${chatid}`}>
  <div className="sidebarChat">
      <Avatar
        src={host.ID === authid ? `${guest.img}` : `${host.img}`}
      />
      <div className="sidebarChat__info">
        <h2>{host.ID === authid ? `${guest.name}${guest.lastName}` : `${host.name}${host.lastName}`}</h2>
        <p>{messages[messages.length -1].text}</p>
      </div>
    </div>
      </Link>
  ) 
}
