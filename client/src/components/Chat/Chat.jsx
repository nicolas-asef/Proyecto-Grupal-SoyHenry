import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoreVert from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ guest, host, messages }) {
  const [input, setInput] = useState("");
  const { user } = useAuth0();
  const socket = useSelector((state) => state.socket);
  const [mensajes, setMensajes] = useState(messages);
  const [elemento, setElemento] = useState({});
  const [forceUpdate, setForceUpdate] = useState(true);
  const [onChat, setOnchat] = useState();
  useEffect(() => {
    setMensajes(messages);
  }, [messages]);

  useEffect(() => {
    socket?.on("createMessage", ({ EmitterID, text, date }) => {
      //aca renderizo el mensaje del texto y listo
      setOnchat(EmitterID);
      setElemento({ text, EmitterID, date });
      setForceUpdate(false);
    });
  }, [socket, onChat]);

  useEffect(() => {
    if (guest?.ID === onChat || host?.ID === onChat) {
      const aux = mensajes;
      aux?.push(elemento);
      setMensajes(aux);
      setForceUpdate(true);
    }
  }, [elemento]);

  var horas = `${new Date(Date.now()).getHours()}`;
  var minutos = `${new Date(Date.now()).getMinutes()}`;
  if (minutos < 10) {
    minutos = "0" + minutos;
  }

  function sendMessage(e) {
    e.preventDefault();
    socket?.emit("messageCreation", {
      id_emisor: user.sub,
      id_receptor: host.ID === user.sub ? guest.ID : host.ID,
      texto: input,
      date: horas + ":" + minutos,
    });
    const aux = mensajes;
    aux.push({ text: input, EmitterID: user.sub, date: horas + ":" + minutos });
    setInput("");
    setMensajes(aux);
    socket?.emit("enviarNotificacion", {
      receptor_id: host.ID === user.sub ? guest.ID : host.ID,
      emisor_id: user.sub,
      tipo: "mensaje",
    });
  }

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };
  mensajes &&
    mensajes.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

  /*   let date = messages && messages[0].createdAt.split(".", 1).join("").split("T").pop().slice(0,2)
  console.log(date - 3) */
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={
            host === undefined
              ? "Loading"
              : host.ID === user.sub
              ? `${guest.img}`
              : `${host.img}`
          }
        />
        <div className="chat__headerInfo">
          <h3>
            {host === undefined
              ? "Loading"
              : host.ID === user.sub
              ? `${guest.name} ${guest.lastName}`
              : `${host.name} ${host.lastName}`}
          </h3>
          <p>Last seen at: {"No se cuando estuvo"}</p>
        </div>
        <div className="chat__headerButtons">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <ScrollToBottom className="messageContainer">
          {mensajes?.map((message, index) => (
            <div key={index}>
              <ChatMessage
                name={
                  host === undefined
                    ? "Loading"
                    : message.EmitterID === host.ID
                    ? `${host.name}`
                    : `${guest.name}`
                }
                message={message.text}
                timestamp={message.date}
                isSender={
                  host === undefined
                    ? "Loading"
                    : message.EmitterID === user.sub
                    ? true
                    : false
                }
              />
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={handleOnChange}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
