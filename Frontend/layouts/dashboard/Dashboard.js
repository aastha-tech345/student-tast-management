"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronUp,
  User,
  Settings,
  FileText,
} from "lucide-react";
import Profile from "./Profile";
import SettingsPage from "./Settings";
import Reports from "./Reports";
import DefaultDasboard from "./DefaultDasboard";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("overview");
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page);
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      name: "Profile",
      page: "profile",
      icon: <User size={30} />,
      hasChildren: true,
      children: [
        { name: "View Profile", page: "profile" },
        { name: "Edit Profile", page: "profile-edit" },
      ],
    },
    { name: "Settings", page: "settings", icon: <Settings size={30} /> },
    { name: "Reports", page: "reports", icon: <FileText size={30} /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "profile":
      case "profile-edit":
        return <Profile />;
      case "settings":
        return <SettingsPage />;
      case "reports":
        return <Reports />;
      default:
        return <DefaultDasboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-center">
          <h2
            className={`text-2xl font-bold text-[rgb(10_168_167/var(--tw-bg-opacity,_1))] transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Dashboard
          </h2>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <div key={item.name}>
              <div
                className={`mb-2 cursor-pointer p-1 flex items-center justify-between ${
                  activePage === item.page
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  if (item.hasChildren) {
                    setSubmenuOpen(!submenuOpen);
                  } else {
                    handleNavigation(item.page);
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  {isSidebarOpen && (
                    <span className="text-gray-800">{item.name}</span>
                  )}
                </div>
                {item.hasChildren && isSidebarOpen && (
                  <button className="p-1">
                    {submenuOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {/* Submenu */}
              {item.hasChildren && submenuOpen && isSidebarOpen && (
                <div className="ml-6">
                  {item.children.map((child) => (
                    <div
                      key={child.name}
                      className={`mb-2 cursor-pointer p-1 ${
                        activePage === child.page
                          ? "bg-gray-300 font-semibold"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handleNavigation(child.page)}
                    >
                      <span className="text-gray-500">{child.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <div className="flex items-center space-x-4">
            {/* Mobile Sidebar Toggle */}
            <button
              className="sm:hidden p-2 bg-[rgb(10_168_167/var(--tw-bg-opacity,_1))] text-white rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              className="hidden sm:flex p-1 bg-gray-200 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <ChevronsLeft size={18} />
              ) : (
                <ChevronsRight size={18} />
              )}
            </button>

            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Welcome, User</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
