"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
 // adjust path to your firebase client
import {
  FiHome,
  FiGrid,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiMenu,
  FiUser,
  FiMoon,
  FiSun,
} from "react-icons/fi";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(true);
  const [profilePic, setProfilePic] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const pic = localStorage.getItem("profilePic");
    if (pic) setProfilePic(pic);

    const savedDark =
      localStorage.getItem("darkMode") === "true" ||
      localStorage.getItem("theme") === "dark";

    setDarkMode(!!savedDark);
    document.documentElement.classList.toggle("dark", savedDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("profilePic");
      localStorage.removeItem("darkMode");
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed — check console.");
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    const q = encodeURIComponent(val || "");
    router.push(`/dashboard/search?q=${q}`); // ✅ fixed
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] dark:bg-[#0b1220] transition-colors text-gray-900 dark:text-gray-100">

      {/* Sidebar */}
      <div className={`relative transition-all duration-300 bg-white dark:bg-[#0f1724] shadow-xl border-r dark:border-gray-800 ${open ? "w-64" : "w-20"} p-5`}>
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-8 bg-pastel-pink dark:bg-gray-700 rounded-full p-2 shadow-md hover:scale-110"
        >
          <FiMenu size={18} className="dark:text-white" />
        </button>

        <h1 className="text-2xl font-bold text-pastel-purple dark:text-pink-300 mb-10">
          {open ? "Campus Connect" : "CC"}
        </h1>

        <nav className="space-y-3">
          <NavItem href="/dashboard" icon={<FiHome />} label="Dashboard" open={open} pathname={pathname} />
          <NavItem href="/dashboard/projects" icon={<FiGrid />} label="Projects" open={open} pathname={pathname} />
          <NavItem href="/dashboard/profile" icon={<FiUser />} label="Profile" open={open} pathname={pathname} />
          <NavItem href="/dashboard/settings" icon={<FiSettings />} label="Settings" open={open} pathname={pathname} />

          <button
            className="flex gap-3 items-center text-red-500 mt-8 hover:text-red-600"
            onClick={handleLogout}
          >
            <FiLogOut size={20} />
            {open && "Logout"}
          </button>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-[#071026] shadow-md rounded-bl-3xl rounded-br-3xl">

          {/* Search */}
          <div className="flex items-center bg-[#F2F3F5] dark:bg-[#0b1a2b] p-3 rounded-xl w-80">
            <FiSearch className="text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search something..."
              value={searchQuery}
              onChange={onSearchChange}
              className="bg-transparent px-3 w-full outline-none text-gray-800 dark:text-white"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {darkMode ? <FiSun className="text-yellow-400" size={18} /> : <FiMoon size={18} />}
            </button>

            <div onClick={() => router.push("/dashboard/profile")} className="h-10 w-10 rounded-full overflow-hidden cursor-pointer">
              <img src={profilePic || "https://via.placeholder.com/100"} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">{children}</div>

      </div>
    </div>
  );
}

function NavItem({ href, icon, label, open, pathname }: any) {
  const active = pathname === href || pathname?.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-3 rounded-xl ${
        active ? "bg-pastel-purple text-black font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      {open && label}
    </Link>
  );
}
