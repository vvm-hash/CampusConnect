import Image from "next/image";

const clubs = [
  {
    name: "Marketing Club",
    members: 32,
    image: "https://images.unsplash.com/photo-1556767576-f3e757c3c72f",
  },
  {
    name: "UI/UX Club",
    members: 25,
    image: "https://images.unsplash.com/photo-1604145559206-e3bce0040e0c",
  },
  {
    name: "Creative Arts Club",
    members: 12,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
  },
  {
    name: "Success Story Club",
    members: 35,
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
  },
  {
    name: "Social Network Club",
    members: 120,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    name: "Technical Experts Club",
    members: 42,
    image: "https://images.unsplash.com/photo-1521790945508-bf2a36314e85",
  },
];

export default function CommunitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-orange-800 mb-10">Communities</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {clubs.map((club, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-orange-200 shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="h-44 w-full relative">
              <Image
                src={club.image}
                alt={club.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-700">{club.name}</h3>
              <p className="text-gray-600 mb-4">{club.members} members</p>

              <button className="w-full border border-orange-600 text-orange-700 rounded-xl py-2 hover:bg-orange-600 hover:text-white transition font-semibold">
                Join Community
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
