// src/pages/StudentCourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function StudentCourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/api/courses/${courseId}`);
        setCourse(res.data.course);
        setLessons(res.data.lessons || []);
      } catch (err) {
        console.error("Failed to load course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>

      <h2 className="text-lg font-semibold mb-2">Lessons</h2>
      <ul className="space-y-2">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className="bg-white shadow px-4 py-2 rounded flex justify-between items-center"
          >
            <span>{lesson.title}</span>
            <a
              href={`/courses/${courseId}/lessons/${lesson.id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentCourseDetails;
