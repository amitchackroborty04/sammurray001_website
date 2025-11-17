"use client";
import React, { useState } from "react";
import { Search, Paperclip, Send, Check, ChevronRight } from "lucide-react";

const Message = () => {
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Darrell Steward",
      lastMessage: "Is the property still available?",
      time: "2 min ago",
      unread: 2,
      avatar: "DS",
      online: true,
    },
    {
      id: 2,
      name: "Dianne Russell",
      lastMessage: "Thank you for the information!",
      time: "1 hour ago",
      unread: 0,
      avatar: "DR",
      online: true,
    },
    {
      id: 3,
      name: "Wade Warren",
      lastMessage: "Can we schedule a viewing?",
      time: "Yesterday",
      unread: 1,
      avatar: "WW",
      online: false,
    },
  ];

  const chatMessages = [
    {
      id: 1,
      text: "Hi! I'm interested in the office space in Auckland CBD.",
      time: "10:30 AM",
      sender: "other",
    },
    {
      id: 2,
      text: "Hello! Thanks for your interest. The property is still available. Would you like to schedule a viewing?",
      time: "10:32 AM",
      sender: "me",
      read: true,
    },
    {
      id: 3,
      text: "Yes, that would be great! What times are available this week?",
      time: "10:35 AM",
      sender: "other",
    },
    {
      id: 4,
      text: "I have availability on Tuesday at 2 PM or Thursday at 10 AM. Which works better for you?",
      time: "10:37 AM",
      sender: "me",
      read: true,
    },
    {
      id: 5,
      text: "Tuesday at 2 PM would be perfect!",
      time: "10:40 AM",
      sender: "other",
    },
  ];

  return (
    <div className="">
      <div className="w-full py-12 px-6 flex justify-center">
        <div className="max-w-7xl text-center">
          <h1 className="text-5xl font-serif text-white mb-4">Messages</h1>

          <div className="flex items-center justify-center gap-2 text-sm">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">Messages</span>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto h-screen text-white">
        {/* Sidebar */}
        <div className="w-[280px] bg-[#1a1d2e] border-r border-gray-700">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-[#252837] rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-[#252837] transition-colors ${
                  conv.id === 1 ? "bg-[#252837]" : ""
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-sm font-semibold">
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1d2e]"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-xs font-semibold">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-[70px] bg-[#1a1d2e] border-b border-gray-700 flex items-center px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-sm font-semibold">
                  LA
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1d2e]"></div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">
                  Leslie Alexander
                </h2>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#1a1d2e]">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[60%] ${
                    msg.sender === "me"
                      ? "bg-teal-600 rounded-2xl rounded-br-sm"
                      : "bg-[#252837] rounded-2xl rounded-bl-sm"
                  } px-4 py-3`}
                >
                  <p className="text-sm text-white leading-relaxed">
                    {msg.text}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs text-gray-300">{msg.time}</span>
                    {msg.sender === "me" && msg.read && (
                      <Check className="w-3 h-3 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-[#1a1d2e] border-t border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-white transition-colors p-2">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              <button className="bg-teal-500 hover:bg-teal-600 transition-colors rounded-lg p-2.5">
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
