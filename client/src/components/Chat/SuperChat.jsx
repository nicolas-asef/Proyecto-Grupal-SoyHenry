import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar/SideBar";
import "./SuperChat.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function SuperChat() {
  return (
    <div className="app">
      <div className="app__body">
        {/* <Router> */}
        {/* <Router> */}
        <Sidebar />
        <Chat />
        {/* <Route
            path="/chat/:chatId"
            element={
              <Chat
                room={"This is a room"}
                lastSeenDate={"A random date"}
                userId={"hostId"}
              />
            }
          /> */}
        {/* <Route path="/">
              <h1>Home Screen</h1>
            </Route> */}
        {/* </Router> */}
      </div>
    </div>
  );
}
