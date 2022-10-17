import { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001");

export default function Chat() {
  //   const [messages, setMessages] = useState([]);
  //   const [message, setMessage] = useState("");

  //   useEffect(() => {
  //     const receiveMessage = (message) => {
  //       setMessages([message, ...messages]);
  //     };

  //     socket.on("createMessage", receiveMessage);

  //     return () => {
  //       socket.off("message", receiveMessage);
  //     };
  //   }, [messages]);

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const newMessage = {
  //       body: message,
  //       from: "Me",
  //     };
  //     setMessages([newMessage, ...messages]);
  //     setMessage("");
  //     socket.emit("createMessage", newMessage.body);
  //   };

  return (
    <div>
      <h1>Chat page</h1>
    </div>
  );
}
