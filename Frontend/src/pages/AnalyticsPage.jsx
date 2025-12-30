// src/pages/AnalyticsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/taskSlice";
import { fetchUsers } from "../features/authSlice";

import StateCard from "../components/analytics/StateCard";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import TasksOverTimeChart from "../components/analytics/TasksOverTimeChart";
import DivisionTable from "../components/analytics/DivisionTable";

function AnalyticsPage() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.auth);

  // fetch tasks + users when page loads
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="p-6">Loading analytics...</p>;

  // calculate metrics
  const pending   = tasks.filter((t) => t.status === "pending").length;
  const inwork    = tasks.filter((t) => t.status === "inwork").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  const avgTaskTime = completed
    ? (
        tasks.reduce((acc, t) => {
          if (t.endTime && t.startTime) {
            return acc + (new Date(t.endTime) - new Date(t.startTime));
          }
          return acc;
        }, 0) / completed / 3600000
      ).toFixed(2)
    : 0;

  const activeProjects = tasks.filter(
    (t) => t.status !== "pending" && t.status !== "inwork"
  ).length;

  const availableStaff = users.filter(
    (u) => u.role === "employee" 
  ).length;

  // sample divisions (replace with backend grouping if available)
  const divisions = [
    { name: "Frontend", count: tasks.filter((t) => t.division === "Frontend").length },
    { name: "Backend", count: tasks.filter((t) => t.division === "Backend").length },
    { name: "Design", count: tasks.filter((t) => t.division === "Design").length },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StateCard title="Pending Tasks" value={pending} color="red" />
        <StateCard title="Inwork Tasks" value={inwork} color="yellow" />
        <StateCard title="Completed Tasks" value={completed} color="green" />
        <StateCard title="Avg Task Time" value={`${avgTaskTime} hrs`} color="purple" />
        <StateCard title="Active Projects" value={activeProjects} color="indigo" />
        <StateCard title="Available Staff" value={availableStaff} color="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-indigo-700 font-bold mb-4">Task Status Distribution</h3>
          <TaskStatusChart pending={pending} inwork={inwork} completed={completed} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-indigo-700 font-bold mb-4">Tasks Over Time</h3>
          <TasksOverTimeChart
            data={[
              { month: "Jan", count: 5 },
              { month: "Feb", count: 12 },
              { month: "Mar", count: 9 },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-indigo-700 font-bold mb-4">Tasks by Division</h3>
        <DivisionTable divisions={divisions} />
      </div>
    </div>
  );
}

export default AnalyticsPage;