// components/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
