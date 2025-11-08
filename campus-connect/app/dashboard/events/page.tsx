"use client";

import Link from "next/link";

export default function EventsPage() {
  const festivals = [
    { name: "GLANZ", id: "glanz" },
    { name: "TECHFEST", id: "techfest" },
    { name: "WAVES", id: "waves" },
    { name: "INNOVISION", id: "innovision" }
  ];

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold text-orange-800 mb-8">College Festivals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((fest) => (
          <Link
            key={fest.id}
            href={`/dashboard/events/${fest.id}`}
            className="bg-white border border-orange-200 rounded-2xl p-6 shadow hover:shadow-md transition text-center font-semibold text-orange-700 hover:bg-orange-50"
          >
            {fest.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
