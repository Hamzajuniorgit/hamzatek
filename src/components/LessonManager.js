// src/components/LessonManager.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const LessonManager = ({ courseId, onClose, readOnly = false }) => {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  const handleEditClick = (lesson) => {
    setEditingLesson(lesson);
    setTitle(lesson.title);
    setContent(lesson.content);
    setFile(null);
  };

  const handleUpdateLesson = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("file", file);

      await axiosInstance.put(`/lessons/update/${editingLesson.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Lesson updated!");
      setEditingLesson(null);
      setTitle("");
      setContent("");
      setFile(null);
      fetchLessons();
    } catch (err) {
      console.error("Update lesson failed", err);
      toast.error("Failed to update lesson.");
    }
  };
  const handleMarkComplete = async (lessonId) => {
    try {
      await axiosInstance.post(`/lessons/complete/${lessonId}`);
      toast.success("Lesson marked as completed!");
      fetchLessons(); // Refresh lessons to update completed status
    } catch (err) {
      console.error("Failed to mark lesson complete", err);
      toast.error("Failed to mark lesson as completed.");
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const res = await axiosInstance.get(`/lessons/course/${courseId}`);
      if (!res.data || res.data.length === 0) {
        toast.info(
          readOnly
            ? "No lessons available for this course."
            : "No lessons found for this course. Add one to get started.",
          { toastId: `no-lessons-${courseId}` }
        );
        if (readOnly) {
          onClose(); // Close modal only in read-only mode (students)
        }
        setLessons([]);
        return;
      }
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
      toast.error("Error loading lessons.");
    }
  };

  const handleAddLesson = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("courseId", courseId);
      if (file) formData.append("file", file);

      await axiosInstance.post("/lessons/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Lesson added!");
      setTitle("");
      setContent("");
      setFile(null);
      fetchLessons();
    } catch (err) {
      console.error("Add lesson failed", err);
      toast.error("Failed to add lesson.");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await axiosInstance.delete(`/lessons/delete/${lessonId}`);
      toast.success("Lesson deleted!");
      setLessons(lessons.filter((l) => l.id !== lessonId));
    } catch (err) {
      toast.error("Failed to delete lesson.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {readOnly ? "View Lessons" : "Manage Lessons"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {!readOnly && (
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Lesson title"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Lesson content"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={editingLesson ? handleUpdateLesson : handleAddLesson}
            >
              {editingLesson ? "Update Lesson" : "Add Lesson"}
            </button>
          </div>
        )}

        {lessons.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Content</th>
                <th className="py-2 px-4 text-left">Resource</th>
                {!readOnly && <th className="py-2 px-4 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{lesson.title}</td>
                  <td className="py-2 px-4 truncate max-w-xs">
                    {lesson.content || "-"}
                  </td>
                  <td className="py-2 px-4">
                    {lesson.resource ? (
                      <a
                        href={`http://localhost:5173/uploads/lessons/${lesson.resource}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Resource
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  {!readOnly && (
                    <td className="py-2 px-4 flex gap-2">
                      <button
                        onClick={() => handleEditClick(lesson)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  <td className="py-2 px-4">
                    {readOnly && (
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          lesson.completed
                            ? "bg-gray-500"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                        onClick={() => handleMarkComplete(lesson.id)}
                        disabled={lesson.completed}
                      >
                        {lesson.completed ? "Completed" : "Mark as Completed"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">
            {readOnly
              ? "No lessons available."
              : "No lessons yet. Add one above."}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LessonManager;
