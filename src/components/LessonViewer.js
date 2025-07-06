// src/components/LessonViewer.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const LessonViewer = ({ courseId, onClose, onNoLessons }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get(`/lessons/course/${courseId}`);
        const fetchedLessons = response.data || [];
        if (fetchedLessons.length === 0) {
          onNoLessons();
          onClose();
        } else {
          setLessons(fetchedLessons);
        }
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
        toast.error("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId, onNoLessons, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Course Lessons</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p className="text-gray-600">No lessons available.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Content Type</th>
                <th className="py-2 px-4 text-left">Duration</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{lesson.title}</td>
                  <td className="py-2 px-4">{lesson.content_type || "-"}</td>
                  <td className="py-2 px-4">{lesson.duration || "-"}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() =>
                        toast.info(`Viewing lesson: ${lesson.title}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;
