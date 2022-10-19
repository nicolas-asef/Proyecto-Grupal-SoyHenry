import "./SidebarChat.css";

import React from "react";
import { Avatar } from "@mui/material";

export default function SiderbarChat({host, guest, messages, authid}) {
  
  function createChat() {
    alert("creating...");
  }

  return (
  <div className="sidebarChat">
      <Avatar
        src={host.img}
      />
      <div className="sidebarChat_info">
        <h2>{host.ID === authid ? `${guest.name}${guest.lastName}` : `${host.name}${host.lastName}`}</h2>
        <p>{messages[messages.length -1].text}</p>
      </div>
    </div>
  ) 
}
