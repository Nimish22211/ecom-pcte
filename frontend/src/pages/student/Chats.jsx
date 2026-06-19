import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../socket";
import { getChatHistory } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Chats = () => {
  const { state } = useLocation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(!!state?.roomId);
  const bottomRef = useRef(null);

  const roomId = state?.roomId;

  useEffect(() => {
    if (!roomId) return;

    getChatHistory(roomId)
      .then(({ data }) => setMessages(data))
      .finally(() => setLoading(false));

    socket.emit("join_room", { roomId });

    const handleReceive = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit("send_message", { roomId, senderId: user._id, text });
    setText("");
  };

  if (!roomId) {
    return (
      <div className="p-8 text-center text-slate-500">
        Open a product and tap "Chat with Seller" to start a conversation.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-100px)]">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Chat with {state?.sellerName || "Seller"}
      </h1>

      <div className="flex-1 overflow-y-auto bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
        {loading && <p className="text-slate-500">Loading messages...</p>}
        {!loading && messages.length === 0 && (
          <p className="text-slate-500">No messages yet. Say hi!</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
              msg.senderId === user._id
                ? "bg-blue-700 text-white ml-auto"
                : "bg-slate-100 text-slate-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 mt-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chats;
