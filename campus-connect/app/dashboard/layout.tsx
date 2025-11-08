"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiSettings, FiLogOut, FiBell, FiSearch } from "react-icons/fi";
import React from "react"; // fixes JSX namespace error
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase"; // SAME path used in login / signup


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;  // ✅ fixed
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
    <div className="flex h-screen bg-[#f7f8fc]">

      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-white border-r p-5 ${open ? "w-64" : "w-20"
          }`}
      >
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


          <button
            onClick={() => signOut(auth)}
            className="flex gap-3 items-center text-red-500 mt-10 hover:text-red-600"
          >
            <FiLogOut size={20} />
            {open && "Logout"}
          </button>


        </nav>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
          {/* Search */}
          <div className="flex items-center bg-gray-100 p-2 rounded-lg w-72">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search…"
              className="bg-transparent px-2 w-full outline-none"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <FiBell className="text-gray-600 hover:text-black cursor-pointer" size={20} />
            <div className="h-9 w-9 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
