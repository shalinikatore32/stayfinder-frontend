import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { useState } from "react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-rose-50 via-emerald-50 to-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:static md:top-0 top-16 left-0 z-40 
          bg-white/80 backdrop-blur-lg border-r border-emerald-100 shadow-xl transform transition-transform duration-300 ease-in-out
          w-64 md:h-full h-[calc(100vh-4rem)] overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-600 mb-8 tracking-wide">
              StayFinder
            </h1>

            <nav className="space-y-3 text-[17px] font-medium">
              <NavLink
                to="/dashboard/profile"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 shadow-sm"
                      : "hover:bg-emerald-50 text-gray-700"
                  }`
                }
              >
                <FaUser />
                Profile
              </NavLink>

              <NavLink
                to="/dashboard/bookings"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 shadow-sm"
                      : "hover:bg-emerald-50 text-gray-700"
                  }`
                }
              >
                <FaClipboardList />
                Bookings
              </NavLink>

              <button
                onClick={handleGoHome}
                className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl text-gray-700 hover:bg-rose-100 transition"
              >
                <FaHome />
                Go to Home
              </button>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition mt-6 shadow"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Topbar for mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-md px-4 py-3 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-emerald-600">StayFinder</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <FaTimes className="text-2xl text-rose-500" />
          ) : (
            <FaBars className="text-2xl text-rose-500" />
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 h-full mt-16 md:mt-0 overflow-y-auto p-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
