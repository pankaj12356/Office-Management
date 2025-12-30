import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create Task
export const createTask = createAsyncThunk("tasks/createTask", async (formData) => {
  const token = localStorage.getItem("accessToken"); // fixed typo
  const res = await axios.post("/api/task", formData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  console.log(res.data.message);
  
  return res.data.task;
});

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId) => {
  const token = localStorage.getItem("accessToken");
  let url = "/api/task";
  if (userId) {
    url += `?assigned=${userId}`;
  }
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return res.data;
});

// Update Task Status
export const updateTaskStatus = createAsyncThunk("tasks/updateStatus", async ({ id, status }) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.patch(
    `/api/task/${id}`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
  console.log(res.data.message);
  return res.data.task;
});

// Delete Task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const token = localStorage.getItem("accessToken");
  await axios.delete(`/api/task/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  // console.log(res.data.id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Task Status
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) state.tasks[index] = updatedTask;
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;