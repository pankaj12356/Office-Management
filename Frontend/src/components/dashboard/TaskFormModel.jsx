// components/dashboard/TaskFormModal.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../features/taskSlice";

function TaskFormModal({ show, onClose }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  // Local form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build task payload
    const formData = {
      title,
      description,
      assignedTo, // just the user ID string
    };

    // Dispatch createTask thunk
    await dispatch(createTask(formData));
    console.log("Task form submitted:", formData);

    // Close modal after save
    onClose();

    // Reset form
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Assign Task</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Assign To */}
          <div>
            <label className="block text-sm font-medium">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows="3"
              placeholder="Enter task details..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;