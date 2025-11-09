"use client";
import {
  FiUsers,
  FiBookOpen,
  FiStar,
  FiMessageSquare,
  FiTrendingUp,
} from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-10">

      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-3xl shadow-lg flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold mb-3">
          Welcome Back 🎓
        </h1>
        <p className="opacity-90 text-lg max-w-2xl">
          Your Campus Network. Your Community. Your Space.  
          Connect with peers, collaborate on projects, and grow together.
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard icon={<FiUsers />} value="1,245+" label="Students Connected" />
        <StatCard icon={<FiBookOpen />} value="87" label="Projects Active" />
        <StatCard icon={<FiStar />} value="42" label="Communities" />
        <StatCard icon={<FiMessageSquare />} value="310" label="Messages Sent Today" />

      </div>

      {/* MINI SECTION + CHART placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">Campus Activity</h2>
          <p className="text-gray-600 text-sm">
            Activity visualization coming soon...
          </p>
          <div className="h-40 flex items-center justify-center text-gray-400">
            <FiTrendingUp size={48} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">Latest Announcements</h2>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li>• 🎉 TechFest Hackathon starts next week! Register soon.</li>
            <li>• 📣 New Clubs added: Robotics, Anime Club, Book Circle</li>
            <li>• 🏆 Project Expo submissions are now open.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 border hover:shadow-md transition">
      <div className="text-orange-600 text-3xl">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
}
