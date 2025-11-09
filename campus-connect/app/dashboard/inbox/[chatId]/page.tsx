"use client";

import { useState, useEffect, useRef } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      chatId,
      sender: user.uid,
      text: input,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
              msg.sender === user?.uid
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="flex p-3 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
