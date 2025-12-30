import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Fallback image if no profileImage is set
  const fallbackImage =
    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png";

  // Role color mapping
  const roleColors = {
    admin: "bg-blue-100 text-blue-700",
    manager: "bg-purple-100 text-purple-700",
    user: "bg-green-100 text-green-700",
  };
  console.log(user?.profileImage);
  

  const roleClass =
    roleColors[user?.role?.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center space-x-4">
        {/* Email */}
        <span className="text-gray-600">{user?.email || "guest@example.com"}</span>
         
        {/* Role badge */}
        {user?.role && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${roleClass}`}
          >
            {user.role}
          </span>
        )}
        
        {/* Profile image with fallback */}
        <img
  src={
    user?.profileImage?.startsWith("data:image")
      ? user.profileImage
      : fallbackImage
  }
  alt="Profile"
  className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
/>
         
        {/* Logout button */}
        
      </div>
    </header>
  );
}

export default Navbar;