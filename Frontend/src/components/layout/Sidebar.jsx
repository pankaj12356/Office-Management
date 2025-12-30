import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import { IoLogInOutline ,IoHome ,IoAnalytics } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { PiUserSquareFill } from "react-icons/pi";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // 👈 get current user

  const handleLogout = async () => {
    await dispatch(logoutUser());   // clears user, token, etc.
    navigate("/login");             // redirect to login page
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col">
      <div className="flex items-center gap-2 p-6 text-2xl font-bold border-b border-indigo-500">
       <IoHome />  Dashboard
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/analytics" className="flex gap-2 items-center py-2 px-4 rounded hover:bg-indigo-700">
          <IoAnalytics size={20} /> Analytics
        </Link>

        {/* Only show Users link if admin */}
        {user?.role === "admin" && (
          <Link to="/users" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-indigo-700">
            <PiUserSquareFill size={22} /> Users
          </Link>
        )}

        <Link to="/tasks" className="flex gap-2 py-2 px-4 rounded hover:bg-indigo-700">
          <BiTask size={22} /> Tasks
        </Link>

        {/* Show Login link only if not logged in */}
        {!user && (
          <Link to="/login" className="flex items-center gap-2 py-2 px-4 rounded hover:bg-indigo-700">
            <IoLogInOutline size={23} /> Login
          </Link>
        )}
      </nav>

      {/* Show Logout only if logged in */}
      {user && (
        <div className="p-4 border-t border-indigo-500">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;