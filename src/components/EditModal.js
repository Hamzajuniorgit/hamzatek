import React from "react";
import CreateCourseForm from "./CreateCourseForm";

const EditModal = ({ course, user, onClose, onUpdated }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Edit Course</h2>
        <CreateCourseForm
          user={user}
          onSuccess={() => {
            onUpdated();
            onClose();
          }}
          initialValues={course}
          courseId={course.id}
        />
      </div>
    </div>
  );
};

export default EditModal;
