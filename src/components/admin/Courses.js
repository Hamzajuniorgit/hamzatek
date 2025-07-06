// AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import CreateCourseAdmin from "../../pages/CreateCourseAdmin";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchCourses = async () => {
    try {
      const res = await axios.get("api/admin/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };
  const handleAssignTeacher = async (courseId, teacher_id) => {
    try {
      await axios.put(
        `http://localhost:5173/api/admin/courses/${courseId}/assign/${teacher_id}`
      );
      fetchCourses();
    } catch (err) {
      console.error("Assignment error:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopbar />

          <h1 className="text-2xl font-bold mb-4">Courses Management</h1>
          <p>This is where the admin can manage courses.</p>
          {/* Courses Table */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">All Courses</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Teacher ID</th>
                    <th className="p-2">Assign Teacher</th>
                    <th className="p-2">Enrolled Students</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-2">{c.title}</td>
                      <td className="p-2">{c.description}</td>
                      <td className="p-2">{c.teacher_id ?? "Unassigned"}</td>
                      <td className="p-2">
                        <select
                          onChange={(e) =>
                            handleAssignTeacher(c.id, e.target.value)
                          }
                          defaultValue=""
                          className="border px-2 py-1"
                        >
                          <option value="">Select Teacher</option>
                          {users
                            .filter((u) => u.role === "teacher" && u.isVerified)
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="p-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <CreateCourseAdmin />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Courses;
