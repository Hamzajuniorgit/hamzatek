import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import EnrollModal from "../components/EnrollModal";
import ViewDetailsModal from "../components/ViewDetailsModal";
import LessonManager from "../components/LessonManager";
import { getPublishedCourses } from "../services/courseService";
import {
  getMyEnrollments,
  unenrollFromCourse,
} from "../services/enrollmentService";
import WelcomeMessage from "../components/WelcomeMessage";
import { toast } from "react-toastify";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showLessonManager, setShowLessonManager] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          getPublishedCourses(),
          getMyEnrollments(),
        ]);
        setCourses(coursesRes.data.courses || []);
        const enrolledIds = enrollmentsRes.data.map((e) => e.course_id);
        setEnrolledCourseIds(enrolledIds);
      } catch (err) {
        console.error("Dashboard load error:", err);
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
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
      await unenrollFromCourse(course.id);
      toast.success("Course successfully unenrolled");
      setEnrolledCourseIds((prev) => prev.filter((id) => id !== course.id));
    } catch (err) {
      console.error("Unenroll failed:", err);
      toast.error("Failed to unenroll from course.");
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  };

  const handleViewLessons = (courseId) => {
    setSelectedCourseId(courseId);
    setShowLessonManager(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Helmet>
        <title>Student Dashboard - E-Learning Platform</title>
        <meta
          name="description"
          content="Manage your enrolled courses, explore new learning opportunities, and track your progress on our learning platform."
        />
      </Helmet>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Student Dashboard
        </h1>

        <div className="mb-6">
          <WelcomeMessage />
        </div>

        {loading ? (
          <p className="text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600">
            No courses available. Check back later.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by course title..."
                className="px-4 py-2 border rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Level</th>
                  <th className="py-3 px-6 text-left">Teacher</th>
                  <th className="py-3 px-6 text-left">Enrolled</th>
                  <th className="py-3 px-6 text-left">Engagement (%)</th>
                  <th className="py-3 px-6 text-left">Progress</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses
                  .filter((course) =>
                    course.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((course) => (
                    <tr key={course.id} className="border-t border-gray-200">
                      <td className="py-3 px-6">{course.title}</td>
                      <td className="py-3 px-6">{course.category || "-"}</td>
                      <td className="py-3 px-6 capitalize">
                        {course.level || "-"}
                      </td>
                      <td className="py-3 px-6">
                        {course.teacher?.name || "-"}
                      </td>
                      <td className="py-3 px-6">{course.enrolledCount || 0}</td>
                      <td className="py-3 px-6">
                        {course.engagementRate || "0"}%
                      </td>
                      <td className="py-3 px-6">
                        {enrolledCourseIds.includes(course.id) ? (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${course.progressPercentage || 0}%`,
                              }}
                            ></div>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-3 px-5 flex flex-wrap gap-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleViewDetails(course)}
                        >
                          Details
                        </button>
                        {enrolledCourseIds.includes(course.id) ? (
                          <>
                            <button
                              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                              onClick={() => handleViewLessons(course.id)}
                            >
                              Lessons
                            </button>
                            <button
                              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                              onClick={() => handleUnenrollClick(course)}
                            >
                              Unenroll
                            </button>
                          </>
                        ) : (
                          <button
                            className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                            onClick={() => handleEnrollClick(course)}
                          >
                            Enroll
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {showEnrollModal && selectedCourse && (
          <EnrollModal
            course={selectedCourse}
            onClose={() => setShowEnrollModal(false)}
            onEnrollSuccess={(id) =>
              setEnrolledCourseIds((prev) => [...prev, id])
            }
          />
        )}

        {showDetailsModal && selectedCourse && (
          <ViewDetailsModal
            course={selectedCourse}
            onClose={() => setShowDetailsModal(false)}
          />
        )}

        {showLessonManager && selectedCourseId && (
          <LessonManager
            courseId={selectedCourseId}
            onClose={() => {
              setShowLessonManager(false);
              setSelectedCourseId(null);
            }}
            readOnly={true}
          />
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
