// components/dashboard/UserTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/authSlice";
import { fetchTasks } from "../../features/taskSlice";
import StatsCard from "./StatusCard";

function UserTable() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Users</h2>

      {loading && <p className="p-4">Loading users...</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users &&
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                      onClick={() => setSelectedUser(user)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="relative bg-white rounded-xl shadow-xl p-6 w-[28rem] max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const userTasks = tasks.filter(
                (t) =>
                  t.assignedTo?._id === selectedUser._id ||
                  t.assignedTo === selectedUser._id
              );

              return (
                <StatsCard
                  name={selectedUser.name}
                  email={selectedUser.email}
                  role={selectedUser.role}
                  profileImage={selectedUser.profileImage}
                  createdAt={selectedUser.createdAt}
                  tasks={userTasks}
                />
              );
            })()}
            <button
              className="absolute top-2 right-2 text-indigo-600 hover:text-indigo-800 font-bold"
              onClick={() => setSelectedUser(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;