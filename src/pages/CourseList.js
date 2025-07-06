/*import React, { useState, useEffect } from "react";
import { getAllCourses } from "../services/api";
import { getMyEnrollments } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import EnrollModal from "../components/EnrollModal";
import StudentCourseDetails from "./StudentCourseDetails";
import { unenrollCourse, unenrollFromCourse } from "../services/enrollmentService";
import CourseDetailsModal from "../components/CourseDetailsModal";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data || []); // fallback to empty array

        const enrollments = await getMyEnrollments();
        const ids = (enrollments.data || []).map((e) => e.course_id); // fallback if data is undefined
        setEnrolledIds(ids);
      } catch (err) {
        console.error("Error fetching data:", err);
        setCourses([]);
        setEnrolledIds([]);
      }
    };

    fetchData();
  }, []);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowEnrollModal(true);
  };

  const handleUnenrollClick = async (course) => {
    try {
      const confirmed = window.confirm(`Unenroll from ${course.title}?`);
      if (!confirmed) return;

      await unenrollFromCourse(course.id);
      alert("Unenrolled successfully");

      // Refresh enrolled list
      const updatedEnrollments = await getMyEnrollments();
      const ids = updatedEnrollments.data.map((e) => e.course_id);
      setEnrolledIds(ids);
    } catch (err) {
      console.error("Unenroll failed", err);
      alert("Failed to unenroll");
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onEnrollClick={handleEnrollClick}
          />
        ))
      ) : (
        <p className="text-gray-500">No published courses available.</p>
      )}

      {showEnrollModal && selectedCourse && (
        <EnrollModal
          course={selectedCourse}
          onClose={() => setShowEnrollModal(false)}
        />
      )}

      {showDetailsModal && selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}

export default CourseList;*/
