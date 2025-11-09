"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProfilePage() {
  const params = useParams();
  const uid = params.uid as string; // ✅ correct way
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const snap = await getDoc(doc(db, "users", uid));
      setUser(snap.data());
    };
    if (uid) fetchUser();
  }, [uid]);

  const startChat = async () => {
    if (!currentUser) return alert("Please login again.");

    const otherUserId = uid;
    const me = currentUser.uid;

    const chatId = me < otherUserId ? `${me}_${otherUserId}` : `${otherUserId}_${me}`;

    await setDoc(
      doc(db, "chats", chatId),
      {
        members: [me, otherUserId],
        lastMessage: "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    router.push(`/dashboard/inbox/${chatId}`);
  };

  if (!user) return <p className="p-6">Loading profile…</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-600 mb-4">{user.email}</p>

      {/* More details later */}
      <p className="text-gray-700">College Email: {user.collegeEmail || "Not added"}</p>
      <p className="text-gray-700 mb-6">Phone: {user.phone || "Not added"}</p>

      <button
        onClick={startChat}
        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
      >
        Message
      </button>
    </div>
  );
}
