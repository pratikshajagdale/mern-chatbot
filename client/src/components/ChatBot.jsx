import { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      sender: "bot",
    },
  ]);

  const sendMessage = async (text) => {
    const userMessage = {
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/chat",
        {
          message: text,
        }
      );

      const botMessage = {
        text: response.data.answer,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "500px",
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatBot;