import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import CourseForm from "../components/CourseForm";
import axiosInstance from "../services/axiosInstance";

const CreateCourseAdmin = () => {
  const { user } = useAuth;

  const handleSubmit = async (courseData) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post("admin/courses", courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Course created successfully!");
    } catch (err) {
      console.error("Course creation failed", err);
      alert("Failed to create course");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Course</h2>
      <CourseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateCourseAdmin;
