// src/pages/teacher/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import CreateCourseForm from "../components/CreateCourseForm";
import { useAuth } from "../context/AuthContext";
import EditModal from "../components/EditModal";
import { toast } from "react-toastify";
import LessonManager from "../components/LessonManager";
import EnrolledStudentsModal from "../components/EnrolledStudentsModal";
import WelcomeMessage from "../components/WelcomeMessage";
import { Helmet } from "react-helmet";

function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showLessonManager, setShowLessonManager] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/courses/my-courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      toast.error("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await axiosInstance.delete(`/courses/delete/${courseId}`);
      toast.success("Course deleted successfully");
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (error) {
      console.error("Failed to delete course", error);
      toast.error("Failed to delete course.");
    }
  };

  const viewEnrolled = async (courseId) => {
    try {
      const res = await axiosInstance.get(
        `/enrollments/course/${courseId}/enrolled`
      );
      if (!res.data || res.data.length === 0) {
        toast.info("No students enrolled in this course.");
        return;
      }
      setEnrolledStudents(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching enrolled users:", error);
      toast.error("Failed to fetch enrolled students.");
    }
  };

  const updateCourse = (id, updates) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...updates } : course
      )
    );
  };

  const handlePublish = async (id) => {
    try {
      await axiosInstance.patch(`/courses/publish/${id}`);
      updateCourse(id, { isPublished: true });
      toast.success("Course published");
    } catch (err) {
      toast.error("Failed to publish course");
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axiosInstance.patch(`/courses/unpublish/${id}`);
      updateCourse(id, { isPublished: false });
      toast.info("Course unpublished");
    } catch (err) {
      toast.error("Failed to unpublish course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Helmet>
        <title>Teacher Dashboard | Hamza Tech Solutions</title>
        <meta
          name="description"
          content="Manage your courses, create new ones, and track student engagement on Hamza Tech Solutions."
        />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href="https://www.hamzatechsolutions.com/teacher-dashboard"
        />
      </Helmet>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Teacher Dashboard
        </h1>

        <div className="mb-6">
          <WelcomeMessage />
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-900"
          >
            {showForm ? "Hide Form" : "Create New Course"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white border p-6 rounded shadow mb-6">
            <CreateCourseForm user={user} onSuccess={fetchCourses} />
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading your courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600">
            No courses found. Start by creating one.
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
                  <th className="py-3 px-6 text-left">Published</th>
                  <th className="py-3 px-6 text-left">Enrolled</th>
                  <th className="py-3 px-6 text-left">Engagement (%)</th>
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
                        {course.isPublished ? "Yes" : "No"}
                      </td>
                      <td className="py-3 px-6">{course.enrolledCount || 0}</td>
                      <td className="py-3 px-6">
                        {course.engagementRate || "0"}%
                      </td>
                      <td className="py-3 px-5 flex flex-wrap gap-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                          onClick={() => setEditingCourse(course)}
                        >
                          Edit
                        </button>
                        {!course.isPublished ? (
                          <button
                            onClick={() => handlePublish(course.id)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnpublish(course.id)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Unpublish
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() => handleDelete(course.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                          onClick={() => {
                            setSelectedCourseId(course.id);
                            setShowLessonManager(true);
                          }}
                        >
                          Lessons
                        </button>
                        <button
                          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                          onClick={() => viewEnrolled(course.id)}
                        >
                          Enrolled
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {editingCourse && (
          <EditModal
            course={editingCourse}
            user={user}
            onClose={() => setEditingCourse(null)}
            onUpdated={fetchCourses}
          />
        )}
        {showLessonManager && selectedCourseId && (
          <LessonManager
            courseId={selectedCourseId}
            onClose={() => {
              setShowLessonManager(false);
              setSelectedCourseId(null);
            }}
            readOnly={false}
          />
        )}
        {showModal && (
          <EnrolledStudentsModal
            students={enrolledStudents}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
