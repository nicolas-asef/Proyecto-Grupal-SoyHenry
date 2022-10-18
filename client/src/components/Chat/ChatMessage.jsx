import React from "react";
import "./ChatMessage.css";

function ChatMessage(props) {
  return (
    <div className="chatMessage ">
      <p
        className={
          props.isSender
            ? "chatMessage__message chatMessage__receiver"
            : "chatMessage__message"
        }
      >
        {props.message}
        <span className="chatMessage__name">{props.name}</span>
        {props.message}
        <span className="chatMessage__timestamp">{props.timestamp}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
