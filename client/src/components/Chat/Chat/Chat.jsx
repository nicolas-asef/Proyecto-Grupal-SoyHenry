import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { Avatar } from "@mui/material";

// const socket = io("http://localhost:3001");

export default function Chat(id, users) {
  return (
    <Container1>
      <Sidebar />
      <UserAvatar />
      <p>Aca iria cada conversacion</p>
    </Container1>
  );
}

const Container1 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
