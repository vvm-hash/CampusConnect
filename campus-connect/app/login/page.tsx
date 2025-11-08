"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // ✅ Redirect to Dashboard
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-6">
      <div className="bg-white shadow-lg rounded-3xl p-25 w-full max-w-3xl border border-orange-200">
        <h2 className="text-5xl font-bold text-center text-orange-700 mb-6">Welcome Back</h2>

        {/* ✅ Added submit handler and state bindings */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-2xl text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-orange-300 rounded-lg text-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="you@college.edu"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-2xl text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-orange-300 rounded-lg text-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* ✅ Show error message if login fails */}
          {error && <p className="text-center text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-lg text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-md text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-orange-700 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
