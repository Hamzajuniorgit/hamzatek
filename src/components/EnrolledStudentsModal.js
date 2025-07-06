import React from "react";

const EnrolledStudentsModal = ({ students, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Enrolled Students</h2>
      <ul className="space-y-2">
        {students.map((s) => (
          <li key={s.id} className="border p-2 rounded">
            <p>
              <strong>Name:</strong> {s.User.name}
            </p>
            <p>
              <strong>Email:</strong> {s.User.email}
            </p>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default EnrolledStudentsModal;
