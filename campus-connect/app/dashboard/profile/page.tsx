"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FiUser, FiPhone, FiTarget, FiBook, FiCheck, FiMail } from "react-icons/fi";

export default function ProfilePage() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // read-only
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setEmail(data.email || user.email || "");
        setBranch(data.branch || "");
        setYear(data.year || "");
        setPhone(data.phone || "");
        setSkills(data.skills || "");
      }
      setLoading(false);
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);

    // Only update editable fields
    await updateDoc(ref, { branch, year, phone, skills });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="p-6 text-lg">Loading profile...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-800 mb-6">Your Profile</h1>

      <div className="space-y-5 bg-white shadow-md p-6 rounded-lg border border-orange-200">

        {/* Name (Read-only) */}
        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiUser /> Full Name
          </label>
          <input
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 mt-1 cursor-not-allowed"
            value={name}
            disabled
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiMail /> College Email
          </label>
          <input
            className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 mt-1 cursor-not-allowed"
            value={email}
            disabled
          />
        </div>

        {/* Editable Fields Below */}
        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiBook /> Branch
          </label>
          <input
            className="w-full border border-orange-300 rounded-lg p-2 mt-1"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="IT / CSE / ETC / Mechanical ..."
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiTarget /> Year
          </label>
          <input
            className="w-full border border-orange-300 rounded-lg p-2 mt-1"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="FE / SE / TE / BE"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiPhone /> Phone Number
          </label>
          <input
            className="w-full border border-orange-300 rounded-lg p-2 mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your WhatsApp Number"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700">
            <FiCheck /> Skills
          </label>
          <textarea
            className="w-full border border-orange-300 rounded-lg p-2 mt-1"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, UI/UX, JS, C++, Figma..."
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 text-lg rounded-lg font-semibold transition"
        >
          Save Changes
        </button>

        {saved && (
          <div className="text-green-600 font-medium text-center mt-2">
            ✅ Profile Updated Successfully
          </div>
        )}
      </div>
    </div>
  );
}
