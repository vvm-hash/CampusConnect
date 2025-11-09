
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatPage() {
  const { chatId } = useParams();
  const id = String(chatId); // ✅ fix undefined issue
  const currentUser = auth.currentUser;

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // ✅ Listen for live messages
  useEffect(() => {
    if (!id) return;

    const chatRef = doc(db, "chats", id);

    const unsub = onSnapshot(chatRef, (snap) => {
      const data = snap.data();
      if (data?.messages) {
        setMessages(data.messages);
      }
    });

    return () => unsub();
  }, [id]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim() || !currentUser) return;

    const chatRef = doc(db, "chats", id);

    await updateDoc(chatRef, {
      messages: arrayUnion({
        sender: currentUser.uid,
        text: input,
        timestamp: serverTimestamp(),
      }),
      updatedAt: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === currentUser?.uid
                ? "bg-orange-200 ml-auto"
                : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-orange-600 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
