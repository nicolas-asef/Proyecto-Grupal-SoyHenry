import React from "react";
import Chat from "./Chat";
import Sidebar from "./SideBar/SideBar";
import "./SuperChat.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChatByPk } from "../../redux/actions/actions";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function SuperChat() {
  const { id } = useParams();
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(chat).length === 0 || id !== undefined) {
      dispatch(getChatByPk(id));
    }
  }, [id]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        {!id ? (
          <div className="chat__loading">
            <p>Debes seleccionar un chat</p>
            <CircularProgress color="success" />
          </div>
        ) : (
          <Chat guest={chat.Guest} host={chat.Host} messages={chat.Messages} />
        )}
      </div>
    </div>
  );
}

export default SuperChat;
