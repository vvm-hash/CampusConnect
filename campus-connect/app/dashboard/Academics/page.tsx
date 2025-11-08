"use client";
import Image from "next/image";

export default function AcademicsPage() {
  const studyPartners = [
    { name: "Drfni Syh", university: "University of Tech" },
    { name: "Prton, ML", university: "University of Tech" },
    { name: "Uetontine of Seera", university: "University Learning" },
  ];

  const studyGroups = [
    { name: "ML Algorithms Deep Dive", time: "2:00 PM" },
    { name: "Data Structures Revision", time: "4:30 PM" },
    { name: "Operating Systems Discussion", time: "6:10 PM" },
  ];

  const quickConnections = [
    { name: "David Lee", skill: "Frontend" },
    { name: "Creative Writing Club", skill: "Open Group" },
  ];

  const resources = [
    "Reinforcement Learning Notes",
    "ML Algorithms Cheat Sheet",
    "Neural Networks Class Notes",
    "Python for Research Study Material",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
      
      {/* LEFT: Study Partner Finder */}
      <div className="col-span-1 bg-white border border-orange-200 shadow-lg rounded-3xl p-6">
        <h3 className="text-xl font-bold text-orange-800 mb-4">Study Partner Finder</h3>

        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Course / Subject"
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-orange-600"
          />
          <input
            type="text"
            placeholder="Year"
            className="w-24 border rounded-lg px-3 py-2 focus:outline-orange-600"
          />
        </div>

        <div className="grid gap-4">
          {studyPartners.map((p, i) => (
            <div
              key={i}
              className="border rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">{p.university}</p>
              </div>
              <button className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-700 transition">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* CENTER: Study Groups & Sessions */}
      <div className="col-span-1 bg-white border border-orange-200 shadow-lg rounded-3xl p-6">
        <h3 className="text-xl font-bold text-orange-800 mb-4">Study Groups & Sessions</h3>
        
        <button className="border border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white transition px-4 py-2 rounded-xl mb-6">
          Create New Study Group
        </button>

        <div className="space-y-4">
          {studyGroups.map((group, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm text-gray-500">{group.time}</p>
              </div>
              <button className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-700 transition">
                Join Session
              </button>
            </div>
          ))}
        </div>
      </div>


      {/* RIGHT: Quick Connect + Notes */}
      <div className="col-span-1 space-y-8">
        
        {/* Quick Connects */}
        <div className="bg-white border border-orange-200 shadow-lg rounded-3xl p-6">
          <h3 className="text-xl font-bold text-orange-800 mb-4">Quick Connects</h3>
          <div className="space-y-4">
            {quickConnections.map((q, i) => (
              <div key={i} className="flex justify-between items-center border rounded-xl p-4 hover:shadow-md transition">
                <div>
                  <p className="font-semibold">{q.name}</p>
                  <p className="text-sm text-gray-500">{q.skill}</p>
                </div>
                <button className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-700 transition">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes & Resources */}
        <div className="bg-white border border-orange-200 shadow-lg rounded-3xl p-6">
          <h3 className="text-xl font-bold text-orange-800 mb-4">Notes & Resources</h3>
          <div className="space-y-2">
            {resources.map((r, i) => (
              <div key={i} className="border rounded-xl p-3 hover:bg-orange-50 transition cursor-pointer">
                {r}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
