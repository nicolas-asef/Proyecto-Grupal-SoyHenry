import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoreVert from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Chat(props) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState("");
  const { chatId } = useParams();
  const socket = useSelector((state) => state.socket);
  const login = useAuth0();
  const params = useParams();

  // useEffect(() => {
  //   if(chatId) {
  //     Chat de db
  //     .(chatId)
  //     .socket setChat
  //   }
  // })

  const sendMessage = async (e) => {
    await socket?.emit("messageCreation", {
      id_emisor: login.user.sub,
      id_receptor: params.id,
      texto: "Chau",
    });
  };

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={"https://avatars.dicebear.com/api/human/${props.userId}.svg"}
        />
        <div className="chat__headerInfo">
          <h3>{props.room}</h3>
          <p>Last seen at: {props.lastSeenDate}</p>
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
        <ChatMessage
          name={"HOST"}
          message="This is a message HOST  D:"
          timestamp={"8:26"}
          isSender={true}
        />
        <ChatMessage
          name={"GUEST"}
          message="This is a message GUEST :D"
          timestamp={"8:26"}
          isSender={false}
        />
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
