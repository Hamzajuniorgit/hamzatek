import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, BookOpen, Users, LayoutDashboard, User } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed">
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <Link
          to="/admin"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link
          to="/admin/courses"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <BookOpen size={20} /> Courses
        </Link>
        <Link
          to="/admin/teachers"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <User size={20} /> Teachers
        </Link>
        <Link
          to="/admin/students"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <Users size={20} /> Students
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-1">Logged in as: {user?.name}</p>
        <p className="text-sm text-gray-400 mb-3">Role: {user?.role}</p>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
