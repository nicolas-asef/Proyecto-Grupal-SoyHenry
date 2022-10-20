import React from "react";
import "./Sidebar.css";
import { Avatar, Icon, IconButton, CircularProgress } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SidebarChat from "./SidebarChat";
import Chat from "../Chat";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getChats } from "../../../redux/actions/actions";
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar() {
  const { user, isLoading } = useAuth0();
  const chats = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const [chat, setChat] = useState("");

  useEffect(() => {
    if (!isLoading && chats.length === 0) {
      dispatch(getChats(chat));
    }
  });
  const handleChange = (e) => {
    setChat(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getChats(chat));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__header-icons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search-container">
          <SearchOutlined onChange={handleChange} />
          <input
            placeholder="Buscar en chats"
            type="text"
            onSubmit={handleSearch}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {/*        <SidebarChat newChat={true} /> */}
        {chats.length === 0 ? (
          <div className="loading__sidebar">
            <p>Aún no tienes ninguna conversacion</p>
            <CircularProgress color="success" />
          </div>
        ) : (
          chats.map((chat) => (
            <div key={chat.id}>
              <SidebarChat
                host={chat.Host}
                guest={chat.Guest}
                messages={chat.Messages}
                authid={user.sub}
                chatid={chat.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Sidebar;

// import { Avatar, Button } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat";
// import IconButton from "@mui/material/IconButton";
// import styled from "styled-components";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchIcon from "@mui/icons-material/Search";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useSelector } from "react-redux";

// export default function Sidebar() {
//   //   const socket = useSelector((state) => state.socket);
//   //   const {
//   //     user: { sub },
//   //   } = useAuth0();

//   const createChat = () => {
//     // const input = prompt(
//     //   "Please ener an email address for the user you whis to chat with"
//     // );
//     // if (!input) return null;
//   };

//   return (
//     <Container>
//       <Header>
//         <UserAvatar />

//         <IconsContainer>
//           <IconButton>
//             <ChatIcon />
//           </IconButton>
//           <IconButton>
//             <MoreVertIcon />
//           </IconButton>
//         </IconsContainer>
//       </Header>

//       <Search>
//         <SearchIcon />
//         <SearchInput placeholder="Search in chats" />
//       </Search>

//       <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
//       {/* Lista de chats */}
//       {/* Aca iria el mapeo de los chats del mismo user */}
//     </Container>
//   );
// }

// const Container = styled.div``;

// const SidebarButton = styled(Button)`
//   width: 100%;

//   &&& {
//     border-top: 1px solid whitesmoke;
//     border-bottom: 1px solid whitesmoke;
//   }
// `;

// const Search = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 5px;
//   border-radius: 2px;
// `;

// const SearchInput = styled.input`
//   outline-width: 0;
//   border: none;
//   flex: 1;
// `;

// const Header = styled.div`
// display: flex;
// position: sticky
// top: 0;
// background-color: white;
// z-index: 1;
// justify-content: space-between;
// align-items: center;
// padding: 15px;
// height: 80px;
// border-bottom: 1px solid whitesmoke;
// `;

// const IconsContainer = styled.div``;

// const UserAvatar = styled(Avatar)`
//   cursor: pointer;

//   :hover {
//     opacity: 0.8;
//   }
// `;
