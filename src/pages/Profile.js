// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const { user } = useAuth(); // Get the logged-in user from AuthContext
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${user.id}`); // Fetch user profile from backend
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again later.");
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {profile.name}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {profile.email}
          </div>
          <div>
            <span className="font-semibold text-gray-700">Role:</span>{" "}
            {profile.role}
          </div>
          {profile.role === "teacher" && (
            <div>
              <span className="font-semibold text-gray-700">
                Courses Taught:
              </span>{" "}
              {profile.coursesTaught || "No courses yet"}
            </div>
          )}
          {profile.role === "student" && (
            <div>
              <span className="font-semibold text-gray-700">
                Enrolled Courses:
              </span>{" "}
              {profile.enrolledCourses || "No courses yet"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
