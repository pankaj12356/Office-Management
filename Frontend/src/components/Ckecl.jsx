import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchUsers, logoutUser } from "../features/authSlice";

/* ======================
   Card Component
====================== */
const UserCard = ({ name, email, role, imageUrl }) => {
  return (
    <div className="
      m-4 w-[300px] overflow-hidden rounded-2xl
      bg-red backdrop-blur-xl
      border border-white/40
      shadow-xl transition-all duration-300
      hover:-translate-y-2 hover:shadow-indigo-500/40
    ">
      {/* Image */}
      <img
        src={imageUrl}
        alt={name}
        className="h-[200px] w-full object-cover"
      />

      {/* Info */}
      <div className="p-4 text-center bg-white/70">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/60">
        <span
          className={`
            text-xs font-semibold px-3 py-1 rounded-full
            ${
              role === "Admin"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-indigo-100 text-indigo-700"
            }
          `}
        >
          {role}
        </span>

        <button className="
          px-4 py-1.5 text-xs font-semibold rounded-full
          bg-gradient-to-r from-indigo-600 to-violet-600
          text-white hover:from-indigo-500 hover:to-violet-500
          transition
        ">
          Follow
        </button>
      </div>
    </div>
  );
};

/* ======================
   Main Page
====================== */
const CheckPage = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        User Management
      </h2>

      {user ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-700">
              Logged in as <strong>{user.name}</strong> ({user.role})
            </p>

            <button
              onClick={() => dispatch(logoutUser())}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Grid */}
          <div className="flex flex-wrap justify-center">
            {users.map((u) => (
              <UserCard id='main' 
                key={u.id}
                name={u.name}
                email={u.email}
                role={u.role}
                imageUrl={
                  u.profileImage || "https://via.placeholder.com/300x200"
                }
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-700">No user logged in</p>
      )}
    </div>
  );
};

export default CheckPage;
