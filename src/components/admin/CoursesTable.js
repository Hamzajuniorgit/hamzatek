import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

const CoursesTable = ({ courses: propCourses, filterKey = "title" }) => {
  const [courses, setCourses] = useState(propCourses || []);
  const [loading, setLoading] = useState(!propCourses);
  const [assignModal, setAssignModal] = useState({
    show: false,
    courseId: null,
  });
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    if (!propCourses) {
      axiosInstance.get("/admin/courses").then((res) => {
        setCourses(res.data.courses || []); // ✅ set only the array
        setLoading(false);
      });
    }
  }, [propCourses]);

  const updateCourse = (id, updates) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...updates } : course
      )
    );
  };

  const handlePublish = async (id) => {
    try {
      await axiosInstance.patch(`/admin/courses/publish/${id}`);
      updateCourse(id, { isPublished: true });
      toast.success("Course published");
    } catch (err) {
      toast.error("Failed to publish course");
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await axiosInstance.patch(`/admin/courses/unpublish/${id}`);
      updateCourse(id, { isPublished: false });
      toast.info("Course unpublished");
    } catch (err) {
      toast.error("Failed to unpublish course");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/courses/${id}`);
      setCourses((prev) => prev.filter((course) => course.id !== id));
      toast.success("Course deleted");
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  const openAssignModal = async (id) => {
    setAssignModal({ show: true, courseId: id });
    try {
      const res = await axiosInstance.get("/users/verified-teachers");
      const data = res.data.teachers;

      if (Array.isArray(data)) {
        setTeachers(data);
      } else {
        console.warn("Expected array but got:", data);
        setTeachers([]);
      }
    } catch (err) {
      toast.error("Failed to load teachers");
      setTeachers([]); // fallback
    }
  };

  const handleAssign = async () => {
    if (!selectedTeacher || !assignModal.courseId) return;

    try {
      await axiosInstance.put(
        `/admin/courses/${assignModal.courseId}/assign/${selectedTeacher}`
      );

      const teacher = teachers.find((t) => t.id === parseInt(selectedTeacher));
      updateCourse(assignModal.courseId, { teacher });

      setAssignModal({ show: false, courseId: null });
      setSelectedTeacher("");
      toast.success("Teacher assigned successfully");
    } catch (error) {
      toast.error("Error assigning teacher");
      console.error("Error assigning teacher:", error);
    }
  };

  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) => {
        const courseField = course[filterKey]?.toLowerCase() || "";
        return courseField.includes(search.toLowerCase());
      })
    : [];

  // Pagination: Paginate filtered courses
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* Search and Page Info */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder={`Search by ${filterKey}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold text-gray-700">
                Course Name
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700">
                Published
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
              <th className="px-6 py-3 font-semibold text-gray-700 hidden md:table-cell">
                Teacher
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course) => (
              <tr key={course.id}>
                <td
                  className="px-6 py-4 truncate max-w-[180px]"
                  title={course.title}
                >
                  {course.title}
                </td>
                <td className="px-6 py-4">
                  {course.isPublished ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
                  {!course.isPublished ? (
                    <button
                      onClick={() => handlePublish(course.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublish(course.id)}
                      className="px-3 py-1 bg-gray-500 text-white rounded mr-2"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openAssignModal(course.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Assign
                  </button>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  {course.teacher?.name || "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold truncate" title={course.title}>
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Published:{" "}
              <span className="font-medium">
                {course.isPublished ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Teacher: {course.teacher?.name || "Unassigned"}
            </p>
            <div className="flex flex-wrap gap-2">
              {!course.isPublished ? (
                <button
                  onClick={() => handlePublish(course.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Publish
                </button>
              ) : (
                <button
                  onClick={() => handleUnpublish(course.id)}
                  className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                >
                  Unpublish
                </button>
              )}
              <button
                onClick={() => handleDelete(course.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => openAssignModal(course.id)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Modal */}
      {assignModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-xl font-semibold">Assign Teacher</h2>
            <select
              className="w-full p-2 border rounded"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setAssignModal({ show: false, courseId: null })}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        totalItems={filteredCourses.length}
        itemsPerPage={rowsPerPage}
      />
    </>
  );
};

export default CoursesTable;
