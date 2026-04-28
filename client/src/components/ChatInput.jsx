import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd",
      }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
        style={{
          flex: 1,
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "12px 16px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        <FaPaperPlane />
      </button>
    </form>
  );
}

export default ChatInput;