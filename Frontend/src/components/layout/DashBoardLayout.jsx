import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";   // 👈 import useSelector
import { fetchProfile, fetchUsers } from "../../features/authSlice";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TaskFormModal from "../dashboard/TaskFormModel";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const location = useLocation(); // get current route
  const [showTaskForm, setShowTaskForm] = useState(false);

  const { user } = useSelector((state) => state.auth);   // 👈 get user from auth slice

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Check if current path is /tasks
  const isTasksPage = location.pathname === "/tasks";

  // Only show assign button if NOT employee
  const canAssign = user && user.role !== "employee";

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Navbar />

        {/* Conditionally render Add Task Button only on /tasks and not for employees */}
        {isTasksPage && canAssign && (
          <div className="p-4">
            <button
              onClick={() => setShowTaskForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              ➕ Assign Task
            </button>
          </div>
        )}

        <section className="p-6 flex-1 overflow-y-auto">{children}</section>
      </main>

      {/* Task Form Modal only relevant for tasks page */}
      {isTasksPage && canAssign && (
        <TaskFormModal show={showTaskForm} onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  );
}

export default DashboardLayout;