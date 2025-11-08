"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function FestivalPage() {
  const params = useParams();

  // ✅ Normalize festival to always be a string
  const rawFestival = params.festival;
  const festival = Array.isArray(rawFestival) ? rawFestival[0] : rawFestival;

  const categories = [
    "Hackathon",
    "Quiz",
    "Treasure Hunt",
    "Box Cricket",
    "BGMI",
    "Clash Royale",
    "Brainiacs",
  ];

  return (
    <div className="mt-10">
      <h1 className="text-4xl font-bold text-orange-800 mb-8">
        {festival ? festival.toUpperCase() : "EVENT"} Events
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/dashboard/events/${festival}/${cat.toLowerCase().replace(/ /g, "")}`}
            className="bg-white border border-orange-200 rounded-2xl p-5 shadow hover:shadow-md text-center font-semibold text-orange-700 hover:bg-orange-50 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
