//src/components/CreateCourseForm.js
import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";

const CreateCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .post("http://localhost:5173/api/admin/courses", { name: courseName })
      .then(() => {
        setCourseName("");
        setLoading(false);
        alert("Course created successfully!");
      })
      .catch((error) => {
        console.error("There was an error creating the course!", error);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="courseName" className="block text-lg font-semibold">
          Course Name
        </label>
        <input
          id="courseName"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full p-3 text-white rounded-md ${
          loading ? "bg-gray-400" : "bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
};

export default CreateCourseForm;
