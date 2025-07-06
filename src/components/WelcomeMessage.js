import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";

const WelcomeMessage = () => {
  const { user } = useAuth();
  const [profileMsg, setProfileMsg] = useState("");
  const [adminMsg, setAdminMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.token) return;

      try {
        const res = await axiosInstance.get("/protected/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const userName = res.data.name || "User";
        const roleLabel =
          res.data.role === "admin"
            ? "Administrator"
            : res.data.role === "teacher"
            ? "Instructor"
            : "Student";

        setProfileMsg(
          `Welcome, ${userName}! You are logged in as an ${roleLabel}.`
        );

        if (res.data.role === "admin") {
          const adminRes = await axiosInstance.get("/protected/admin-only", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (adminRes.status === 200) {
            setAdminMsg("You have full access to administrative controls.");
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(
          err.response?.data?.msg || "Unable to load profile information."
        );
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      {profileMsg && (
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {profileMsg}
        </h2>
      )}
      {adminMsg && (
        <p className="text-sm font-medium text-blue-600 bg-blue-50 p-3 rounded-md">
          {adminMsg}
        </p>
      )}
      {error && (
        <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </p>
      )}
    </div>
  );
};

export default WelcomeMessage;
