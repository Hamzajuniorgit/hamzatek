import React from "react";
import { Outlet } from "react-router-dom"; // import Outlet
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import DashboardContent from "../components/admin/DashboardContent"; // import DashboardContent
import Courses from "../components/admin/Courses"; // import Courses
import Teachers from "../components/admin/Teachers"; // import Teachers
import Students from "../components/admin/Students"; // import Students

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="mb-4">
              Welcome to the admin dashboard. Here you can manage courses,
              students, and teachers.
            </p>
<link path="/admin/courses" component={Courses} />
            <link path="/admin/teachers" component={Teachers} />
            <link path="/admin/students" component={Students} />
            {/* This is where the nested routes will be rendered */}
            <Outlet />
            {/* <DashboardContent /> */}
            {/* <Courses /> */}
            {/* <Teachers /> */}
            {/* <Students /> */}
          </div>
        </main>
        
      
        {/* This is where the nested routes will be rendered */}
      </div>
    </div>
  );
};

export default AdminDashboard;
// This is the main dashboard component for the admin panel.