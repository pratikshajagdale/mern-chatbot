function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "12px",
          borderRadius: "12px",
          backgroundColor: isUser ? "#007bff" : "#e5e5ea",
          color: isUser ? "#fff" : "#000",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

export default MessageBubble;