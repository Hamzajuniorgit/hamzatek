// src/components/CourseDetailsModal.jsx
import React from "react";

function CourseDetailsModal({ course, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="mb-2 text-gray-700">{course.description}</p>

        <div className="mb-4">
          <p>
            <strong>Category:</strong> {course.category}
          </p>
          <p>
            <strong>Level:</strong> {course.level}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Lessons:</h3>
          {course.lessons?.length ? (
            <ul className="list-disc list-inside">
              {course.lessons.map((lesson) => (
                <li key={lesson.id}>{lesson.title || `Lesson ${lesson.id}`}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No lessons added yet.</p>
          )}
        </div>

        {/* You can add resources or files here if available */}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsModal;
