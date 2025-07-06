// src/pages/StudentCoursePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const StudentCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        const courseRes = await axiosInstance.get(`/courses/${id}`);
        setCourse(courseRes.data);

        const lessonsRes = await axiosInstance.get(`/lessons/course/${id}`);
        setLessons(lessonsRes.data);
      } catch (err) {
        setError("Could not load course content.");
        console.error(err);
      }
    };

    fetchCourseAndLessons();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <p className="text-gray-700 mb-4">{course.description}</p>

        <h2 className="text-lg font-semibold mb-2 text-gray-700">Lessons</h2>
        <ul className="space-y-2">
          {lessons.map((lessons) => (
            <li key={lessons.id} className="p-4 border rounded bg-gray-50">
              <h3 className="font-bold">{lessons.title}</h3>
              <p className="text-sm text-gray-600">{lessons.content}</p>
              {lessons.file_url && (
                <a
                  href={lessons.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Download Resource
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentCoursePage;
