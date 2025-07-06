import React, { useState, useEffect } from "react";
import StatsSection from "../components/admin/StatsSection";
import UsersTable from "../components/admin/UsersTable";
import CoursesTable from "../components/admin/CoursesTable";
import CreateCourseForm from "../components/CreateCourseForm";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../services/axiosInstance";
import WelcomeMessage from "../components/WelcomeMessage";
import { Helmet } from "react-helmet";
import AdminInbox from "../components/AdminInbox";

const AdminDashboard2 = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/admin/courses");
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <Helmet>
        <title>Admin Panel - E-Learning Platform</title>
        <meta
          name="description"
          content="Manage your enrolled courses, explore new learning opportunities, and track your progress on our learning platform."
        />
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Admin Dashboard
      </h1>
      <WelcomeMessage />
      {/* Stats Summary */}
      <StatsSection />

      {/* Course Management */}
      <section className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-700">All Courses</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded shadow"
          >
            {showForm ? "Hide Form" : "Create New Course"}
          </button>
        </div>

        {showForm && (
          <div className="border p-4 rounded bg-gray-50">
            <CreateCourseForm user={user} onSuccess={fetchCourses} />
          </div>
        )}

        {loading ? (
          <div className="text-gray-600">Loading courses...</div>
        ) : (
          <CoursesTable courses={courses} filterKey="title" />
        )}
      </section>

      {/* User Management */}
      <section className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">All Users</h2>
        <UsersTable />
      </section>
      <AdminInbox />
    </div>
  );
};

export default AdminDashboard2;
