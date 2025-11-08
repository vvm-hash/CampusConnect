"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Store user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        photoURL: null,         // can be updated later
        branch: "",             // user will fill later in Profile page
        year: "",               // user will fill later in Profile page
        createdAt: new Date(),
      });

      router.push("/dashboard"); // redirect user to dashboard
    } catch (error: any) {
      alert(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-6">
      <div className="bg-white shadow-lg rounded-3xl p-25 w-full max-w-3xl border border-orange-200">
        <h2 className="text-5xl font-bold text-center text-orange-700 mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 text-2xl text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-orange-300 rounded-lg text-lg px-4 py-2"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block mb-1 text-2xl text-gray-700">College Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-orange-300 rounded-lg text-lg px-4 py-2"
              placeholder="example@gec.ac.in"
            />
          </div>

          <div>
            <label className="block mb-1 text-2xl text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-orange-300 rounded-lg px-4 py-2"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-lg text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  );
}
