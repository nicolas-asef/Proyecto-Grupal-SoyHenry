import "./SidebarChat.css";

import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function SiderbarChat({
  host,
  guest,
  messages,
  authid,
  chatid,
}) {
  return (
    <Link to={`/chat/${chatid}`} className="link__sidechat">
      <div className="sidebarChat">
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={host.ID === authid ? `${guest.img}` : `${host.img}`}
        />
        <div className="sidebarChat__info">
          <h2>
            {host.ID === authid
              ? `${guest.name} ${guest.lastName}`
              : `${host.name} ${host.lastName}`}
          </h2>
          <p>Last message. . . {messages.length > 0 && messages[messages.length - 1].text}</p>
        </div>
      </div>
    </Link>
  );
}
