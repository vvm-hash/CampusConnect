"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";  

export default function CategoryPage() {
  const params = useParams();
  const festival = params.festival as string;
  const category = params.category as string;

  const { user } = useAuth();

  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<any[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  const handleInterest = async () => {
    if (!user) return alert("Login first");

    setLoading(true);

    await setDoc(
      doc(db, "event-interests", `${festival}-${category}`, "people", user.uid),
      {
        userId: user.uid,
        name: user.displayName || "Anonymous Student",
        festival,
        category,
        timestamp: new Date(),
      }
    );

    setInterested(true);
    setLoading(false);
  };

  useEffect(() => {
    const peopleRef = collection(
      db,
      "event-interests",
      `${festival}-${category}`,
      "people"
    );

    const unsubscribe = onSnapshot(peopleRef, (snapshot) => {
      setPeople(snapshot.docs.map((d) => d.data()));
    });

    return () => unsubscribe();
  }, [festival, category]);

  return (
    <div className="mt-10 relative">
      <h1 className="text-4xl font-bold text-orange-800 mb-6">
        {category.toUpperCase()} at {festival.toUpperCase()}
      </h1>

      <div className="flex gap-4">
        <button
          onClick={handleInterest}
          disabled={loading || interested}
          className={`px-6 py-3 rounded-xl font-semibold transition ${
            interested
              ? "bg-orange-400 text-white"
              : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
        >
          {interested ? "Interested ✓" : loading ? "Saving..." : "I'm Interested"}
        </button>

        <button
          onClick={() => setShowPanel(true)}
          className="px-6 py-3 rounded-xl border border-orange-600 text-orange-700 hover:bg-orange-50 font-semibold transition"
        >
          View Interested ({people.length})
        </button>
      </div>

      {/* Slide Panel */}
      {showPanel && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 z-50 animate-slide-left">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            Interested People
          </h2>

          <div className="space-y-4 max-h-[85vh] overflow-y-auto pr-2">
            {people.length === 0 && (
              <p className="text-gray-500 text-sm">No one has shown interest yet.</p>
            )}

            {people.map((p) => (
              <div
                key={p.userId}
                className="border border-orange-200 p-3 rounded-xl bg-white shadow-sm"
              >
                <p className="font-semibold text-gray-800">{p.name}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowPanel(false)}
            className="mt-6 block w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
