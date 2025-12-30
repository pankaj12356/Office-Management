import User from "../models/auth.models.js";
import Task from "../models/task.model.js";

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    if (!assignedTo || assignedTo === "undefined") {
      return res.status(400).json({ message: "assignedTo is required" });
    }

    // Validate assigned user
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ message: "Assigned person was invalid" });
    }

    // Create the task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
    });

    console.log("Task created successfully");

    return res.status(201).json({
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update task status
const updateStatus = async (req, res) => {
  try {
    const allowedStatuses = ["pending", "completed", "inwork"];
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Status not defined or invalid" });
    }

    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findOne({ _id: taskId, assignedTo: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    return res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({
      message: "Task deleted successfully",
      id: task._id,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get tasks (all, by filter, or by ID)
const getTask = async (req, res) => {
  try {
    const { status, assigned } = req.query;

    // If specific task ID is requested
    if (req.params.id) {
      const task = await Task.findById(req.params.id)
        .populate("assignedTo", "_id name email")
        .populate("createdBy", "_id name email");

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.json(task);
    }

    // Build filter safely
    let filter = {};
    if (status) filter.status = status;
    if (assigned && assigned !== "undefined" && assigned !== "") {
      filter.assignedTo = assigned;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "_id name email")
      .populate("createdBy", "_id name email");

    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { createTask, deleteTask, updateStatus, getTask };