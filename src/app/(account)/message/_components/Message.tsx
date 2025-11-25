/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";

interface IUser {
  _id: string;
  email: string;
  profileImage?: string;
  fullName?: string;
  name?: string;
}

interface IConversation {
  _id: string;
  members: IUser[];
}

interface IMessage {
  _id: string;
  senderId: string | IUser;
  receiverId: string | IUser;
  conversationId: string;
  message?: string;
  fileUrl?: string;
}

function InboxPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const TOKEN = session?.user?.accessToken || "";

  const [selectedConversationId, setSelectedConversationId] = useState<string>("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesRef = useRef<IMessage[]>([]);

  const [unreadCount, setUnreadCount] = useState<{ [key: string]: number }>({});

  // স্ক্রলের জন্য রেফ
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // ------------------ Fetch Conversations ------------------
  const { data: convRes } = useQuery<IConversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/conversation`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      const json = await res.json();
      return json.data;
    },
    enabled: !!userId,
  });

  const conversations = convRes || [];
  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );

  // ------------------ Fetch Messages (স্ক্রল ফিক্স সহ) ------------------
  const fetchMessages = useCallback(async () => {
    if (!selectedConversationId) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message/${selectedConversationId}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );

    const json = await res.json();
    const fetchedMessages: IMessage[] = json.data || [];
    setMessages(fetchedMessages);
    messagesRef.current = fetchedMessages;

    // ডাটা লোড হওয়ার পর নিশ্চিতভাবে নিচে স্ক্রল
    setTimeout(() => scrollToBottom(), 100);
  }, [selectedConversationId, TOKEN]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // ------------------ SOCKET: Join User ------------------
  useEffect(() => {
    if (!userId) return;
    socket.emit("join", userId);
  }, [userId]);

  // ------------------ SOCKET: Join/Leave Chat ------------------
  useEffect(() => {
    if (!selectedConversationId) return;

    socket.emit("join-chat", { conversationId: selectedConversationId });

    return () => {
      socket.emit("leave-chat", { conversationId: selectedConversationId });
    };
  }, [selectedConversationId]);

  // ------------------ SOCKET: Receive Message ------------------
  useEffect(() => {
    const handleReceive = (msg: IMessage) => {
      if (msg.conversationId === selectedConversationId) {
        messagesRef.current = [...messagesRef.current, msg];
        setMessages((prev) => [...prev, msg]);
        // নতুন মেসেজ আসলে স্ক্রল
        setTimeout(() => scrollToBottom(), 0);
      } else {
        setUnreadCount((prev) => ({
          ...prev,
          [msg.conversationId]: (prev[msg.conversationId] || 0) + 1,
        }));
      }
    };

    socket.on("receive-message", handleReceive);
    return () => {
      socket.off("receive-message", handleReceive);
    };
  }, [selectedConversationId]);

  // ------------------ Send Text Message ------------------
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const receiver = selectedConversation.members.find((m) => m._id !== userId);
    if (!receiver) return;

    const payload = {
      senderId: userId,
      receiverId: receiver._id,
      conversationId: selectedConversation._id,
      message: messageInput,
    };

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    socket.emit("send-message", payload);

    const tempMsg = { ...payload, _id: Date.now().toString() };
    messagesRef.current = [...messagesRef.current, tempMsg];
    setMessages((prev) => [...prev, tempMsg]);
    setMessageInput("");

    // মেসেজ পাঠানোর পর স্ক্রল
    setTimeout(() => scrollToBottom(), 0);
  };

  // ------------------ Send File ------------------
  const handleSendFile = async (file: File) => {
    if (!selectedConversation) return;

    const receiver = selectedConversation.members.find((m) => m._id !== userId);
    if (!receiver) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("conversationId", selectedConversation._id);
    formData.append("senderId", userId);
    formData.append("receiverId", receiver._id);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/message/file`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: formData,
      }
    );

    const json = await res.json();
    const msg = json.data;

    socket.emit("send-message", msg);
    messagesRef.current = [...messagesRef.current, msg];
    setMessages((prev) => [...prev, msg]);

    // ফাইল পাঠানোর পর স্ক্রল
    setTimeout(() => scrollToBottom(), 0);
  };

  // ------------------ Get Other User ------------------
  const getOtherUser = (members: IUser[]) => {
    if (!members || members.length === 0) return null;
    if (members.length === 1) return members[0];
    return members.find((m) => m._id !== userId) || members[0];
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-71px)]">
      <div className="flex container mx-auto h-[80vh] max-w-7xl">
        {/* ==================== Sidebar ==================== */}
        <div className="w-80 bg-[#FFFFFF1A] border border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-white mb-4">Messages</h1>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search Message ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const otherUser = getOtherUser(c.members);

              return (
                <button
                  key={c._id}
                  onClick={() => {
                    setSelectedConversationId(c._id);
                    setUnreadCount((prev) => ({ ...prev, [c._id]: 0 }));
                  }}
                  className={`w-full px-4 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-400 transition ${
                    selectedConversationId === c._id ? "bg-gray-400" : ""
                  }`}
                >
                  <Image
                    width={48}
                    height={48}
                    src={otherUser?.profileImage || "/noavatar.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="font-medium text-white truncate">
                      {otherUser?.fullName || otherUser?.name || "Unknown User"}
                    </h3>
                    <p className="text-xs text-gray-300 truncate">
                      {otherUser?.email || "No email"}
                    </p>
                  </div>

                  {unreadCount[c._id] > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px]">
                      {unreadCount[c._id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================== Chat Area ==================== */}
        <div className="flex-1 bg-[#FFFFFF1A] flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-6 border border-gray-200 bg-[#FFFFFF1A] flex items-center gap-3">
                {(() => {
                  const otherUser = getOtherUser(selectedConversation.members);
                  return (
                    <>
                      <Image
                        width={48}
                        height={48}
                        src={otherUser?.profileImage || "/noavatar.png"}
                        alt="User"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-semibold text-base text-white">
                          {otherUser?.fullName || otherUser?.name || "User"}
                        </h2>
                        <p className="text-xs text-gray-300">{otherUser?.email}</p>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Messages Area - স্ক্রল রেফ যোগ করা হয়েছে */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-6 bg-[#FFFFFF1A]"
              >
                <div className="space-y-6">
                  {messages.map((m) => {
                    const senderId =
                      typeof m.senderId === "string" ? m.senderId : m.senderId._id;
                    const isSender = senderId === userId;

                    return (
                      <div
                        key={m._id}
                        className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`${
                            isSender
                              ? "bg-green-600 text-white"
                              : "bg-gray-200 text-gray-900"
                          } rounded-lg px-4 py-2 max-w-xs break-words`}
                        >
                          {m.message && <p>{m.message}</p>}
                          {m.fileUrl && (
                            <a
                              href={m.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline block mt-2 text-sm text-blue-300"
                            >
                              File
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200 bg-[#FFFFFF1A]">
                <div className="flex items-center gap-3">
                  <label className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg cursor-pointer transition">
                    <Paperclip size={20} />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleSendFile(e.target.files[0]);
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxPage;