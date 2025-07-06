// src/components/ViewDetailsModal.jsx
import React from "react";

function ViewDetailsModal({ course, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-2">Teacher: {course.teacher?.name}</p>
        <p className="text-sm text-gray-500 mb-4">{course.description}</p>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Lessons:</h3>
        <ul className="list-disc ml-6 mb-4">
          {course.lessons?.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          )) || <li>No lessons available.</li>}
        </ul>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Resources:</h3>
        <ul className="list-disc ml-6 mb-4">
          {course.resources?.length > 0 ? (
            course.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {res.name || "Resource"}
                </a>
              </li>
            ))
          ) : (
            <li>No resources available.</li>
          )}
        </ul>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewDetailsModal;
