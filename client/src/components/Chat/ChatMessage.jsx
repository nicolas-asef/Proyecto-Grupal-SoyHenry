import React from "react";
import "./ChatMessage.css";

function ChatMessage({ name, isSender, message, timestamp }) {
  return (
    <div className="chatMessage ">
      <p
        className={
          isSender
            ? "chatMessage__message chatMessage__receiver"
            : "chatMessage__message"
        }
      >
        <span className="chatMessage__name">{name}</span>
        {message}
        <span className="chatMessage__timestamp">{timestamp}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
