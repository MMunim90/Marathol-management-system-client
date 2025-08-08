import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuth from "../custom_hook/useAuth";
import { FiMenu, FiX } from "react-icons/fi";
import Navbar from "../components/Navbar";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [navigate]);
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <div className="flex flex-col h-screen w-11/12 mx-auto">
        <header className="py-4 flex items-center justify-between md:justify-start mt-6">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Sidebar open and close toggle
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </header>

        <div className="flex flex-grow">
          <aside
            className={`fixed z-40 top-0 left-0 h-full transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:transform-none md:relative md:translate-x-0 transition-transform duration-300 w-64`}
          >
            <div className="p-4 text-2xl font-bold border-b text-center">
              Dashboard
            </div>
            <nav className="flex-grow mt-4 space-y-3 px-4">
              {user && (
                <div>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded transition  ${
                        isActive ? "bg-gray-900 text-white" : "text-gray-400"
                      }`
                    }
                  >
                    Profile and Overview
                  </NavLink>
                  <NavLink
                    to="/dashboard/addMarathon"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded transition  ${
                        isActive ? "bg-gray-900 text-white" : "text-gray-400"
                      }`
                    }
                  >
                    Add Marathon
                  </NavLink>
                  <NavLink
                    to="/dashboard/marathonList"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded transition ${
                        isActive ? "bg-gray-900 text-white" : "text-gray-400"
                      }`
                    }
                  >
                    My Marathon List
                  </NavLink>
                  <NavLink
                    to="/dashboard/applyList"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded transition ${
                        isActive ? "bg-gray-900 text-white" : "text-gray-400"
                      }`
                    }
                  >
                    My Apply List
                  </NavLink>
                </div>
              )}
            </nav>
          </aside>

          <main className="flex-grow p-6">
            <div>
              <Outlet></Outlet>
            </div>
          </main>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
