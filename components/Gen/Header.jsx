"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MagicButton from "./Button";
import { logoutSession } from "@/helper/actions";
import { getUserRole } from "@/helper/utility";
import Overlay from "./Overlay";

const Header = () => {
  const userRole = "admin";
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Define navigation menus for each role
  const menus = {
    admin: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "Manage Classes",
        href: "/manage-classes",
      },
      {
        name: "Manage Advisors",
        href: "/manage-advisor",
      },
      {
        name: "Manage SOS",
        href: "/manage-sos",
      },
    ],
    advisor: [
      { label: "Dashboard", path: "/advisor/dashboard" },
      { label: "My Classes", path: "/advisor/classes" },
      { label: "Schedule", path: "/advisor/schedule" },
    ],
    student: [],
  };

  // Fallback menu if the role is not recognized
  const defaultMenu = [{ label: "Home", path: "/" }];

  // Select menu based on the user role
  const navigationMenu = menus[userRole] || defaultMenu;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleClick = () => {
    logoutSession();
    setSidebarOpen(false);
  };

  return (
    <header
      className="bg-white border-b border-black"
      aria-label="Header Component in Gen"
    >
      <nav className="flex justify-between items-center w-full max-w-screen-xl mx-auto p-2 px-6">
        <div>
          <Image
            className="cursor-pointer"
            src="/next.svg"
            alt="Logo Image"
            width={64}
            height={64}
          />
        </div>

        <div
          className={`fixed top-0 right-0 h-full bg-white shadow-md z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 w-72 lg:w-1/4 flex items-center`}
        >
          <ul className="flex flex-col items-start gap-6 p-2 w-full">
            {navigationMenu.map((item, index) => (
              <li key={index} className="w-full">
                <Link
                  className="block w-full p-2 text-center md:p-1 md:w-auto  hover:text-gray-500"
                  href={item.href}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on link click
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <MagicButton
              title="Logout"
              type="button"
              otherClasses="!w-full"
              handleClick={handleClick}
            />
          </ul>
        </div>

        <div>
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-7 w-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-panel-left"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
            </svg>
            <span className="sr-only">Toggle Sidebar</span>
          </button>
        </div>

        {/* Overlay */}
        {isSidebarOpen && <Overlay handleClick={toggleSidebar} />}
      </nav>
    </header>
  );
};

export default Header;
