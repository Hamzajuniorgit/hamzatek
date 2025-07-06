import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import DataTable from "./DataTables";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users!", error);
        toast.error("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleVerify = (id) => {
    axiosInstance
      .put(`/admin/verify/${id}`)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, isVerified: true } : user
          )
        );
        toast.success("User verified successfully!");
      })
      .catch((err) => {
        toast.error("Failed to verify user.");
      });
  };

  const handleUnverify = (id) => {
    axiosInstance
      .put(`/admin/unverify/${id}`)
      .then(() => {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === id ? { ...user, isVerified: false } : user
          )
        );
        toast.success("User unverified.");
      })
      .catch(() => toast.error("Failed to unverify user."));
  };

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/admin/users/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success("User deleted successfully!");
      })
      .catch(() => toast.error("Failed to delete user."));
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Role", accessor: "role" },
    {
      label: "Verified",
      accessor: "verified",
      render: (user) => (user.isVerified ? "Yes" : "No"),
    },
    {
      label: "Actions",
      accessor: "actions",
      render: (user) => (
        <div className="flex gap-2">
          {user.role === "teacher" && !user.isVerified && (
            <button
              onClick={() => handleVerify(user.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Verify
            </button>
          )}
          {user.role === "teacher" && user.isVerified && (
            <button
              onClick={() => handleUnverify(user.id)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Unverify
            </button>
          )}
          <button
            onClick={() => handleDelete(user.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <DataTable data={users} columns={columns} filterKey="name" />
    </div>
  );
};

export default UsersTable;
