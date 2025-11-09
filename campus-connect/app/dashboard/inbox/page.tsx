"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function InboxPage() {
  const [chats, setChats] = useState<any[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChats(data);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex h-full">
      {/* LEFT: CHAT LIST */}
      <div className="w-80 border-r bg-white">
        <h2 className="p-4 font-bold text-lg border-b">Messages</h2>

        {chats.length === 0 && (
          <p className="p-4 text-gray-500 text-sm">No chats yet.</p>
        )}

        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/dashboard/inbox/${chat.id}`}
            className="block px-4 py-3 hover:bg-gray-100 border-b"
          >
            <p className="font-medium">
              {/* We will replace name later */}
              Chat with {chat.members.filter((m: string) => m !== user?.uid)}
            </p>
            <p className="text-sm text-gray-500">{chat.lastMessage || "…"}</p>
          </Link>
        ))}
      </div>

      {/* RIGHT: EMPTY VIEW */}
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    </div>
  );
}
