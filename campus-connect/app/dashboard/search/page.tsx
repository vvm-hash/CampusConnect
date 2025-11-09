"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || ""; // ✅ read ?q= from URL

  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const runSearch = async () => {
      if (!q.trim()) {
        setResults([]);
        return;
      }

      const qQuery = query(
        collection(db, "users"),
        where("name", ">=", q),
        where("name", "<=", q + "\uf8ff")
      );

      const snapshot = await getDocs(qQuery);
      setResults(snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })));
    };

    runSearch();
  }, [q]); // ✅ triggers automatically when URL changes

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search People</h1>

      {q && (
        <p className="text-gray-600 mb-4">
          Showing results for: <span className="font-semibold">{q}</span>
        </p>
      )}

      <div className="space-y-4">
        {results.map((u) => (
          <div key={u.uid} className="p-4 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>

            <Link
              href={`/dashboard/profile/${u.uid}`}
              className="text-blue-600 underline"
            >
              View Profile
            </Link>
          </div>
        ))}

        {q && results.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
