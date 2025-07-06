import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";

const StatsSection = () => {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    teachers: 0,
    students: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/admin/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats!", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          className="bg-white p-6 rounded-xl shadow-md text-center"
        >
          <h3 className="text-xl font-semibold">
            {` ${key.charAt(0).toUpperCase() + key.slice(1)}`}
          </h3>
          <p className="text-2xl">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
