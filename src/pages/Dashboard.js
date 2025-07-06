import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    // Redirect based on role
    if (user.role === "student") {
      navigate("/student-dashboard");
    } else if (user.role === "teacher") {
      navigate("/teacher-dashboard");
    } else if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/not-found"); // Redirect to a not-found page for invalid roles
    }
  }, [user, navigate]);

  return null; // No UI is needed here since this component only handles redirection
}

export default Dashboard;
