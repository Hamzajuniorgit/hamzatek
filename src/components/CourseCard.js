import React from "react";

function CourseCard({
  course,
  isEnrolled,
  onEnrollClick,
  onUnenrollClick,
  onViewDetails,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
      {/* Thumbnail Placeholder */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Course Thumbnail</span>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          By: {course.teacher?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-500 mb-1">Level: {course.level}</p>
        <p className="text-sm text-gray-500 mb-4">Price: ${course.price}</p>

        <div className="flex justify-between items-center">
          {isEnrolled ? (
            <button
              onClick={() => onUnenrollClick(course)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium"
            >
              Unenroll
            </button>
          ) : (
            <button
              onClick={() => onEnrollClick(course)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium"
            >
              Enroll
            </button>
          )}
          <button
            onClick={() => onViewDetails(course)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
