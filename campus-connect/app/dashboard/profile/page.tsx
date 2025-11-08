"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({ name: "", branch: "", year: "" });

    useEffect(() => {
        if (!user) return;
        const loadProfile = async () => {
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                setProfile(snap.data() as { name: string; branch: string; year: string });
            }
        };
        loadProfile();
    }, [user]);


    const save = async () => {
        if (!user) return;
        await updateDoc(doc(db, "users", user.uid), profile);
        alert("Profile Updated ✅");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-orange-800 mb-6">Your Profile</h1>

            <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="border p-2 rounded block mb-3 w-64"
                placeholder="Your Name"
            />

            <input
                value={profile.branch}
                onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
                className="border p-2 rounded block mb-3 w-64"
                placeholder="Branch (IT / CS / etc..)"
            />

            <input
                value={profile.year}
                onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                className="border p-2 rounded block mb-3 w-64"
                placeholder="Year (1st / 2nd / 3rd / 4th)"
            />

            <button onClick={save} className="px-4 py-2 bg-orange-600 text-white rounded">
                Save Profile
            </button>
        </div>
    );
}
