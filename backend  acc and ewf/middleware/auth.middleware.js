import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Incoming Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No Bearer token found in header");
    return res.status(401).json({ message: "No access token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("📦 Extracted token:", token);

  // Quick format check
  if (token.split(".").length !== 3) {
    console.log("❌ Token format invalid (not 3 parts)");
    return res.status(400).json({ message: "Malformed token" });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_ACCESS);
    console.log("✅ Verified payload:", payload);

    const user = await User.findById(payload.id).select("_id name profileImage role email");
    console.log("👤 User fetched from DB:", user);

    if (!user) {
      console.log("❌ No user found for payload.id:", payload.id);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = async(req,res,next) => {
  try {
    if(!req.user) return res.status(403).json({ message: "Access denied. Admins only." });
  
    if(req.user.role !== 'admin'){
      return res.status(403).json({
        message:'Access Denied. Admin Only'
      })
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Server error"})
    
  }
}