"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-full flex">
      
      {/* LEFT CHAT LIST */}
      <div className="w-80 border-r bg-white flex flex-col">
        
        {/* Search */}
        <div className="p-3">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent px-2 w-full outline-none"
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {/* Example user */}
          <div
            onClick={() => setSelectedChat("user123")}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="font-medium">Jayden Church</p>
              <p className="text-sm text-gray-500">Hey! Are we ready?</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT MESSAGE AREA */}
      <div className="flex-1 flex flex-col">
        
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b bg-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <p className="font-semibold">Chat Username</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              <div className="bg-gray-200 max-w-xs p-2 rounded-lg">
                Hey, what's up?
              </div>
              <div className="bg-blue-500 text-white max-w-xs p-2 rounded-lg ml-auto">
                All good bro 🙌
              </div>
            </div>

            {/* Message Input */}
            <div className="p-3 border-t bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type a message…"
                className="flex-1 px-3 py-2 border rounded-lg outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
