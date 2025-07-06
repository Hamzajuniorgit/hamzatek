// src/pages/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axiosInstance.get(`/courses`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details.");
      }
    };

    const fetchLessons = async () => {
      try {
        const res = await axiosInstance.get(`/lessons/course/${courseId}`);
        setLessons(res.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
      }
    };

    fetchCourseDetails();
    fetchLessons();
  }, [courseId]);

  if (error) {
    return <p className="text-red-600 p-6">{error}</p>;
  }

  if (!course) {
    return <p className="p-6 text-gray-600">Loading course details...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Lessons</h2>
          {lessons.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {lessons.map((lessons) => (
                <li key={lessons.id} className="text-gray-700">
                  {lessons.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No lessons available yet.</p>
          )}
        </div>

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
