// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axiosInstance.get("/enrollments/my-courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              {course.title}
            </h3>
            <p className="text-gray-600 mb-1">By: {course.teacher?.name}</p>
            <div className="mb-2">
              <div className="w-full bg-gray-200 h-3 rounded">
                <div
                  className="bg-blue-500 h-3 rounded"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Progress: {course.progress}%
              </p>
            </div>
            <Link
              to={`/courses/${course.course_id}`}
              className="text-blue-600 hover:underline"
            >
              Continue Course
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;
