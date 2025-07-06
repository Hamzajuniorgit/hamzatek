// pages/Projects.jsx
import React from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "E-Learning Platform",
    description:
      "Full-featured online learning system with role-based dashboards, lessons, and student enrollment.",
    image: "/images/elearning.jpg",
    link: "/elearning",
  },
  {
    title: "Admin Dashboard",
    description:
      "Admin panel with user verification, course assignment, and analytics.",
    image: "/images/admin-dashboard.jpg",
    link: "#",
  },
  {
    title: "Cleaner Booking App",
    description:
      "React-based cleaner recruitment and service booking platform (in progress).",
    image: "/images/cleaner.jpg",
    link: "#",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
