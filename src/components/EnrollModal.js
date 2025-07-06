// src/components/EnrollModal.jsx
import React from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

function EnrollModal({ course, onClose, onEnrollSuccess }) {
  const handleConfirm = async () => {
    try {
      const res = await axiosInstance.post("/enrollments/enroll", {
        course_id: course.id,
      });
      toast.success("Course successfully enrolled");
      onEnrollSuccess(course.id);

      onClose();
    } catch (err) {
      console.error("Enrollment error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Enroll in {course.title}?
        </h2>
        <p className="text-gray-600 mb-4">
          Confirm your enrollment. Once enrolled, you’ll access course lessons
          and resources.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnrollModal;
