import User from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./tokens/token.js";
import cloudinary from "./config/cloudinary.js";

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });
    
    const encodedPassword = await bcrypt.hash(password, 10);

    let profileImageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "profiles" });
      console.log(result);
      
      profileImageUrl = result.secure_url;
    }

    const newUser = await User.create({
      name,
      email,
      role,
      password: encodedPassword,
      profileImage: profileImageUrl,
    });

    const refreshToken = createRefreshToken(newUser);
    const accessToken = createAccessToken(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "✔️ User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt, // ✅ include joined date
      },
      accessToken,
    });
  } catch (error) {
    res.status(501).json({ error: error.message });
    console.log(error);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found or wrong email" });
    }

    const isHashed = await bcrypt.compare(password, user.password);
    if (!isHashed) return res.status(401).json({ message: "Password is incorrect" });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      message: "✔️ User Login Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt, // ✅ fixed
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// REFRESH TOKEN
const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
    console.log(error);
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, password, role } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("_id name email role profileImage createdAt"); // ✅ include createdAt

    res.status(203).json({
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        createdAt: updatedUser.createdAt, // ✅ added
      },
      message: `✔️ ${updatedUser.name} was Updated Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// PROFILE
const profile = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage:user.profileImage,
      createdAt: user.createdAt, // ✅ fixed
      message: `${user.name} was fetched successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: error.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    console.log("🗑️ Logged out Successfully");

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(402).json({ error: error.message });
  }
};

// GET ALL USERS (Admin only)
const getUser = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(404).json({
        message: "Only Admin can Access All users",
      });
    }

    const users = await User.find().select("_id name email role profileImage createdAt"); // ✅ include createdAt
    res.status(200).json({
      message: "All users successfully attached",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { register, login, refresh, profile, getUser, updateProfile, logout };