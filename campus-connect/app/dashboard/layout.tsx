"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiSettings, FiLogOut, FiBell, FiSearch } from "react-icons/fi";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/app/context/AuthContext"; // ✅ ADDED

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const NavItem = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-lg transition
      ${pathname === href ? "bg-gray-100 font-semibold" : "hover:bg-gray-100 text-gray-700"}
    `}
    >
      {icon}
      {open && <span>{label}</span>}
    </Link>
  );

  return (
    <AuthProvider> {/* ✅ WRAPPED HERE */}
      <div className="flex h-screen bg-[#f7f8fc]">

        {/* Sidebar */}
        <div className={`transition-all duration-300 bg-white border-r p-5 ${open ? "w-64" : "w-20"}`}>
          <h1
            className="text-2xl font-bold text-pink-500 mb-10 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "Campus Connect" : "CC"}
          </h1>

          <nav className="space-y-4">
            <NavItem href="/dashboard" icon={<FiHome size={20} />} label="Feed" />
            <NavItem href="/dashboard/projects" icon={<FiGrid size={20} />} label="Projects" />
            <NavItem href="/dashboard/settings" icon={<FiSettings size={20} />} label="Settings" />
            <NavItem href="/dashboard/communities" icon={<FiGrid size={20} />} label="Communities" />
            <NavItem href="/dashboard/recentactivity" icon={<FiGrid size={20} />} label="Recent-Activities" />
            <NavItem href="/dashboard/Academics" icon={<FiGrid size={20} />} label="Academics" />
            <NavItem href="/dashboard/events" icon={<FiGrid size={20} />} label="Events" />

            <button
              onClick={handleLogout}
              className="flex gap-3 items-center text-red-500 mt-10 hover:text-red-600"
            >
              <FiLogOut size={20} />
              {open && "Logout"}
            </button>
          </nav>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center bg-gray-100 p-2 rounded-lg w-72">
              <FiSearch className="text-gray-500" />
              <input type="text" placeholder="Search…" className="bg-transparent px-2 w-full outline-none" />
            </div>

            <div className="flex items-center gap-5">
              <FiBell className="text-gray-600 hover:text-black cursor-pointer" size={20} />
              <div className="h-9 w-9 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6 overflow-y-auto">{children}</div>
        </div>

      </div>
    </AuthProvider>
  );
}
