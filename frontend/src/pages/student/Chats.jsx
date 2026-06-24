import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../socket";
import { getChatHistory, getConversations } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Chats = () => {
  const { state } = useLocation();
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  // { roomId, otherUserName }
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const loadConversations = useCallback(() => {
    getConversations()
      .then(({ data }) => setConversations(data))
      .finally(() => setLoadingConversations(false));
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Opened directly from a product page (via "Chat with Seller") — show that
  // thread immediately even if it hasn't sent a first message yet, so it
  // won't appear in the conversations list until then.
  useEffect(() => {
    if (state?.roomId) {
      setActiveRoom({
        roomId: state.roomId,
        otherUserName: state.otherUserName || "User",
      });
    }
  }, [state]);

  // Any new message, in any of this user's threads, refreshes the list
  // (covers brand-new conversations and re-sorts by most recent).
  useEffect(() => {
    const handleConversationUpdate = () => loadConversations();
    socket.on("conversation_updated", handleConversationUpdate);
    return () => socket.off("conversation_updated", handleConversationUpdate);
  }, [loadConversations]);

  // Active thread: load history, join its room, listen for live messages.
  useEffect(() => {
    if (!activeRoom?.roomId) return;
    const { roomId } = activeRoom;

    setLoadingMessages(true);
    setMessages([]);
    getChatHistory(roomId)
      .then(({ data }) => setMessages(data))
      .finally(() => setLoadingMessages(false));

    socket.emit("join_room", { roomId });

    const handleReceive = (message) => {
      if (message.roomId !== roomId) return;
      setMessages((prev) => [...prev, message]);
    };
    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.emit("leave_room", { roomId });
    };
  }, [activeRoom?.roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConversation = (conversation) => {
    setActiveRoom({
      roomId: conversation.roomId,
      otherUserName: conversation.otherUser?.name || "User",
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !activeRoom?.roomId) return;
    socket.emit("send_message", { roomId: activeRoom.roomId, text: text.trim() });
    setText("");
  };

  return (
    <div className="flex h-[calc(100vh-100px)] max-w-6xl mx-auto border border-slate-200 rounded-2xl overflow-hidden bg-white">
      {/* Conversation list */}
      <div className="w-72 shrink-0 border-r border-slate-200 overflow-y-auto">
        <h2 className="px-4 py-3 font-bold text-slate-800 border-b border-slate-100">Chats</h2>
        {loadingConversations && <p className="p-4 text-sm text-slate-500">Loading...</p>}
        {!loadingConversations && conversations.length === 0 && (
          <p className="p-4 text-sm text-slate-500">No conversations yet.</p>
        )}
        {conversations.map((c) => (
          <button
            key={c.roomId}
            onClick={() => openConversation(c)}
            className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
              activeRoom?.roomId === c.roomId ? "bg-blue-50" : ""
            }`}
          >
            <p className="font-medium text-slate-800 truncate">{c.otherUser?.name || "User"}</p>
            <p className="text-sm text-slate-600 truncate mt-0.5">{c.lastMessage}</p>
          </button>
        ))}
      </div>

      {/* Active thread */}
      <div className="flex-1 flex flex-col px-4 py-4 min-w-0">
        {!activeRoom?.roomId ? (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-center px-6">
            Select a conversation, or open a product and tap "Chat with Seller".
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold text-blue-700 mb-4 truncate">
              Chat with {activeRoom.otherUserName}
            </h1>

            <div className="flex-1 overflow-y-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              {loadingMessages && <p className="text-slate-500">Loading messages...</p>}
              {!loadingMessages && messages.length === 0 && (
                <p className="text-slate-500">No messages yet. Say hi!</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={msg._id || i}
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    String(msg.senderId) === String(user._id)
                      ? "bg-blue-700 text-white ml-auto"
                      : "bg-white text-slate-900 border border-slate-200"
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
                className="flex-1 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chats;
