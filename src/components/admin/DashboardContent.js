import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllCourses,
  assignCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
} from "../../services/api";
import EditModal from "../../components/EditModal";
import { toast } from "react-toastify";

const DashboardContent = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersData = await getAllUsers();
      const coursesData = await getAllCourses();
      setUsers(usersData);
      setCourses(
        Array.isArray(coursesData) ? coursesData : coursesData?.courses || []
      );
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        toast.success("Course deleted");
        fetchData();
      } catch {
        toast.error("Failed to delete");
      }
    }
  };

  const handleAssign = async (teacherId, courseId) => {
    try {
      await assignCourse(teacherId, courseId);
      toast.success("Assigned successfully");
      fetchData();
    } catch {
      toast.error("Failed to assign");
    }
  };

  const handlePublishToggle = async (course) => {
    try {
      if (course.status === "Active") {
        await unpublishCourse(course.id);
        toast.success("Unpublished");
      } else {
        await publishCourse(course.id);
        toast.success("Published");
      }
      fetchData();
    } catch {
      toast.error("Status change failed");
    }
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Courses */}
        <section className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {course.description}
              </p>
              <p className="text-sm">Category: {course.category}</p>
              <p className="text-sm">Level: {course.level}</p>
              <p className="text-sm mb-2">Status: {course.status}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(course)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => handlePublishToggle(course)}
                  className={`${
                    course.status === "Active"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  } text-white px-4 py-1 rounded`}
                >
                  {course.status === "Active" ? "Unpublish" : "Publish"}
                </button>
              </div>

              <div className="mt-3">
                <label className="text-sm block mb-1">Assign to Teacher</label>
                <select
                  onChange={(e) => handleAssign(e.target.value, course.id)}
                  className="w-full border p-2 rounded"
                  defaultValue=""
                >
                  <option disabled value="">
                    Select Teacher
                  </option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </section>

        {/* Teachers */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Teachers</h2>
          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 shadow p-3 rounded mb-2"
            >
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.email}</p>
            </div>
          ))}
        </section>

        {/* Students */}
        <section className="col-span-3">
          <h2 className="text-xl font-semibold mt-8 mb-4">Students</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {students.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-gray-800 shadow p-3 rounded"
              >
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-500">{s.email}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showEditModal && selectedCourse && (
        <EditModal
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          course={selectedCourse}
          user={{ token: localStorage.getItem("token") }}
          onClose={() => setShowEditModal(false)}
          onUpdated={fetchData}
        />
      )}
    </div>
  );
};

export default DashboardContent;
