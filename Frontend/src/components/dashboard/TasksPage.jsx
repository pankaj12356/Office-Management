// components/dashboard/TasksPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTaskStatus,
} from "../../features/taskSlice";

function TasksPage() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      dispatch(fetchTasks()); // all tasks
    } else {
      dispatch(fetchTasks(user.id)); // only tasks assigned to this user
    }
  }, [dispatch, user]);

  if (loading) return <p className="p-4">Loading tasks...</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        {user?.role === "admin" ? "All Tasks" : "My Tasks"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {task.title}
                </td>
                <td
                  className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs"
                  title={task.description}
                >
                  {task.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {typeof task.assignedTo === "object"
                    ? `${task.assignedTo.name} (${task.assignedTo.email})`
                    : task.assignedTo || "Unknown"}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "inwork"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {user.role === "employee" && (
                    <button
                      onClick={() => {
                        let nextStatus;
                        if (task.status === "pending") {
                          nextStatus = "inwork";
                        } else if (task.status === "inwork") {
                          nextStatus = "completed";
                        } else {
                          return; // already completed, no action
                        }
                        dispatch(
                          updateTaskStatus({ id: task._id, status: nextStatus })
                        );
                      }}
                      className={`px-3 py-1 text-white text-sm rounded transition ${
                        task.status === "pending"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : task.status === "inwork"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={task.status === "completed"}
                    >
                      {task.status === "pending"
                        ? "Start Work"
                        : task.status === "inwork"
                        ? "Complete"
                        : "Done"}
                    </button>
                  )}
                  {user?.role === "admin" && (
                    <button
                      onClick={() => dispatch(deleteTask(task._id))}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksPage;
