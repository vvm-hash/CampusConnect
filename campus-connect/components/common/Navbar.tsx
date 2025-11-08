"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 py-4 fixed top-0 bg-white shadow-sm z-50">
        <h1 className="text-2xl font-bold">Campus Connect</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl font-semibold"
        >
          ☰
        </button>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-60 bg-white shadow-xl z-50 transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4 text-lg">
          <button onClick={() => setOpen(false)} className="self-end text-3xl">
            ×
          </button>
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/login" className="hover:text-blue-600">Login</Link>
          <Link href="/signup" className="hover:text-blue-600">Sign Up</Link>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
        </div>
      </div>
    </>
  );
}
