"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ background: "linear-gradient(to bottom, #FDF6EC, #E4FBF2)" }}>
      
      {/* Fade + Slide In */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 w-full max-w-3xl border border-[#0D9488]/30"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-extrabold text-center text-[#0D9488] mb-6 tracking-tight"
        >
          Campus Connect
        </motion.h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-xl text-gray-700">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#0D9488]/40 rounded-lg text-lg px-4 py-2 focus:ring-2 focus:ring-[#0D9488] outline-none bg-white"
              placeholder="you@college.edu"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-xl text-gray-700">Password</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#0D9488]/40 rounded-lg text-lg px-4 py-2 focus:ring-2 focus:ring-[#0D9488] outline-none bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-center text-red-600">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-[#0D9488] hover:bg-[#0b7c76] text-white text-lg py-2 rounded-lg font-semibold shadow-md transition"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-5 text-center text-md text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#0D9488] font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
