"use client";
import React from "react";
import { useState, useEffect } from "react";
import FormInventario from "../nuevo-inventario/components/FormInventario";
import Sidebar from "@/components/Sidebar";

const Header = ({ toggleSidebar }) => (
  <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
    <button onClick={toggleSidebar} className="lg:hidden">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <h1 className="text-xl font-bold">Dashboard</h1>
  </header>
);

export default function Inventario() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <di className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <di  className="flex flex-1 justify-center items-center">
          <FormInventario />
        </di>
      </di>
    </div>
  );
}
