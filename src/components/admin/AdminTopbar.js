import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminTopbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <div className="text-gray-700 dark:text-gray-300">
          {user?.name || "Admin"}
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
