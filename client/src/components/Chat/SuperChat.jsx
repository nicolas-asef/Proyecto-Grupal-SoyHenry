import React from "react";
import Chat from "./Chat";
import Sidebar from "./SideBar/SideBar";
import "./SuperChat.css";

function SuperChat() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat room={"This is a room"} lastSeenDate={"A random date"} />
      </div>
    </div>
  );
}

export default SuperChat;
