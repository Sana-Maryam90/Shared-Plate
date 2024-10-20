"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Toast from "../components/Toast";
import { RequestsProvider } from "../hooks/RequestsContext";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <RequestsProvider>
      <div className="flex h-screen">
        <Toast />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 pt-[4.5rem] lg:pl-64 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </RequestsProvider>
  );
};

export default DashboardLayout;
