"use client";
import { MdCheckCircle, MdPerson, MdRocketLaunch, MdEdit } from "react-icons/md";

export default function RecentActivityPage() {
  // This should show only **YOUR** activities for now (dummy)
  const activities = [
    { icon: <MdPerson />, message: "You joined the UI/UX Club", time: "Today" },
    { icon: <MdRocketLaunch />, message: "You started a new project “Campus Navigation App”", time: "2 days ago" },
    { icon: <MdEdit />, message: "You updated your profile bio", time: "3 days ago" },
    { icon: <MdCheckCircle />, message: "You joined the Technical Experts Community", time: "4 days ago" },
    { icon: <MdPerson />, message: "You added 'React' to your skillset", time: "1 week ago" },
    { icon: <MdRocketLaunch />, message: "You joined project “Study Group Finder”", time: "1 week ago" },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-4xl font-extrabold text-orange-800 mb-8">
        Your Recent Activity
      </h2>

      <div className="bg-white rounded-3xl border border-orange-200 shadow-lg p-6 max-h-[75vh] overflow-y-auto">
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="flex gap-4 items-start p-3 rounded-xl hover:bg-orange-50 transition"
            >
              <div className="text-orange-600 text-2xl">
                {activity.icon}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
