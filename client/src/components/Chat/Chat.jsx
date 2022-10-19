import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoreVert from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({guest, host, messages}) {
  const [input, setInput] = useState("");
  const { user } = useAuth0(); 
  const socket = useSelector((state) => state.socket);
  const [mensajes, setMensajes] = useState(messages)

  useEffect(()=>{
    setMensajes(messages)
  }
  ,[messages])

  useEffect(()=>{
    socket?.on("createMessage",({EmitterID,text})=>{
      //aca renderizo el mensaje del texto y listo
      const auxiliar = mensajes
      auxiliar.push({text,EmitterID})
      setMensajes(auxiliar)
      console.log("mensajes-------->",auxiliar)
    })
  },[socket])

  function sendMessage(e) {
    e.preventDefault();
    socket?.emit("messageCreation", {
      id_emisor: user.sub,
      id_receptor: host.ID === user.sub ? guest.ID : host.ID,
      texto: input,
    });
    const auxiliar = mensajes
    auxiliar.push({text:input,EmitterID:user.sub})
    setMensajes(auxiliar)
    console.log(user.sub)
    console.log(host.ID)
    setInput("");
  }

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };
  console.log(messages)
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
           src={host === undefined ? 'Loading' : host.ID === user.sub ? `${guest.img}` : `${host.img}`} 
        />
        <div className="chat__headerInfo">
           <h3>{host === undefined ? 'Loading' : host.ID === user.sub ? `${guest.name} ${guest.lastName}` : `${host.name} ${host.lastName}`}</h3>
          <p>Last seen at: {'No se cuando estuvo'}</p>
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
      <ScrollToBottom>
        {mensajes?.map((message,index)=> (
          <div key={index}>
        <ChatMessage
          name={host === undefined ? 'Loading' : message.EmitterID === host.ID ? `${host.name} ${host.lastName}` : `${guest.name} ${guest.lastName}`}
          message={message.text}
          timestamp={new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}
          isSender={ host === undefined ? 'Loading' : message.EmitterID === user.sub ? true : false}
        />
          </div>
        ))}
        </ScrollToBottom>
{/*         <ChatMessage
          name={"HOST"}
          message="This is a message"
          timestamp={"8:26"}
          isSender={true}
        />
        <ChatMessage
          name={"GUEST"}
          message="This is a message"
          timestamp={"8:26"}
          isSender={false}
        /> */}
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

// import { Container } from "@mui/system";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import styled from "styled-components";
// import { Avatar } from "@mui/material";
// import Sidebar from "./Sidebar/SideBar";
// import getHostID from "../../../../api/utils/getHostID";
// import { useAuth0 } from "@auth0/auth0-react";
// import router from "../../../../api/src/routes/chat";

// // const socket = io("http://localhost:3001");

// export default function Chat(id, users) {
//   const [user] = useAuth0;
//   //const [guestID] = Chat donde user sea

//   const hostID = getHostID(users, user);
//   console.log(hostID);

//   const enterChat = () => {
//     // router.push(`/chat/${id}`)
//   };
//   return (
//     <Container1 onClick={enterChat}>
//       {/* {chat ? (
//         <UserAvatar1 src={host?.imgURL} />
//         ) : (
//           <UserAvatar1>{guest[0]}</UserAvatar1>
//         )
//       }

//       <p>{hostID}</p> */}
//     </Container1>
//   );
// }

// const Container1 = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   padding: 15px;
//   word-break: break-word;
// `;

// const UserAvatar1 = styled(Avatar)`
//   margin: 5px;
//   margin-right: 15px;
// `;
