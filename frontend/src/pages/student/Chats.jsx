import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../socket";
import { getChatHistory, getConversations } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

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
    <div className="mx-auto flex h-[calc(100vh-100px)] max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* Conversation list */}
      <div
        className={`w-full shrink-0 overflow-y-auto border-r border-slate-200 sm:w-72 ${
          activeRoom?.roomId ? "hidden sm:block" : "block"
        }`}
      >
        <h2 className="border-b border-slate-100 px-4 py-3 font-bold text-slate-800">Chats</h2>
        {loadingConversations && <Loader />}
        {!loadingConversations && conversations.length === 0 && (
          <p className="p-4 text-sm text-slate-500">No conversations yet.</p>
        )}
        {conversations.map((c) => (
          <button
            key={c.roomId}
            type="button"
            onClick={() => openConversation(c)}
            aria-current={activeRoom?.roomId === c.roomId}
            className={`w-full border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              activeRoom?.roomId === c.roomId ? "bg-primary-50" : ""
            }`}
          >
            <p className="truncate font-medium text-slate-800">{c.otherUser?.name || "User"}</p>
            <p className="mt-0.5 truncate text-sm text-slate-500">{c.lastMessage}</p>
          </button>
        ))}
      </div>

      {/* Active thread */}
      <div
        className={`flex min-w-0 flex-1 flex-col px-4 py-4 ${
          activeRoom?.roomId ? "flex" : "hidden sm:flex"
        }`}
      >
        {!activeRoom?.roomId ? (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-slate-500">
            Select a conversation, or open a product and tap "Chat with Seller".
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveRoom(null)}
                aria-label="Back to conversations"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 sm:hidden"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="truncate text-xl font-bold text-primary-700">
                Chat with {activeRoom.otherUserName}
              </h1>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              {loadingMessages && <Loader />}
              {!loadingMessages && messages.length === 0 && (
                <p className="text-slate-500">No messages yet. Say hi!</p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={msg._id || i}
                  className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                    String(msg.senderId) === String(user._id)
                      ? "ml-auto bg-primary-700 text-white"
                      : "border border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSend} className="mt-4 flex gap-2">
              <label htmlFor="chat-message" className="sr-only">
                Message
              </label>
              <input
                id="chat-message"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
              <button
                type="submit"
                disabled={!text.trim()}
                className="rounded-lg bg-primary-700 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
