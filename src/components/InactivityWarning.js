import React from "react";
import { useAuth } from "../context/AuthContext";

const InactivityWarning = () => {
  const { showWarning, stayLoggedIn } = useAuth();

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-xl shadow-lg p-4 z-50 w-full max-w-md text-center">
      <p className="mb-2 font-medium">
        ⚠️ You’ll be logged out in 1 minute due to inactivity.
      </p>
      <button
        onClick={stayLoggedIn}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Stay Logged In
      </button>
    </div>
  );
};

export default InactivityWarning;
