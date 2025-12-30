import mongoose from "mongoose";

const taskScheama = new mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },

    description: {
      type: String,
      require: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "inwork", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskScheama);

export default Task;
