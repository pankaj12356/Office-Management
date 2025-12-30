import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register
export const registerUser = createAsyncThunk("auth/registerUser", async (formdata) => {
  const res = await axios.post("/api/auth/register", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  localStorage.setItem("accessToken", res.data.accessToken);
  console.log(res.data.message);
  return res.data;
});

// Login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials) => {
  const res = await axios.post("/api/auth/login", credentials, { withCredentials: true });
  localStorage.setItem("accessToken", res.data.accessToken);
  console.log(res.data.message);
  
  return res.data;
});

// Refresh
export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const res = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data;
});

// Profile
export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get("/api/auth/", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  console.log(res.data.message);
  console.log(res.data?.profileImage);
  return res.data; // backend returns user object directly
});

// Update Profile
export const updateProfile = createAsyncThunk("auth/updateProfile", async (formdata) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put("/api/auth/update", formdata, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  console.log(res.data.message);
  return res.data.user;
});

// Fetch Users (Admin)
export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get("/api/auth/users", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  console.log(res.data.message);
  return res.data.users;
});

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await axios.delete("/api/auth/", { withCredentials: true });
  
  localStorage.removeItem("accessToken");
 
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    users: [],
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.users = [];
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.users = [];
        localStorage.removeItem("accessToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;