// pages/Gallery.jsx
import React from "react";

const images = [
  "/images/repair1.jpg",
  "/images/repair2.jpg",
  "/images/networking.jpg",
  "/images/pc-repair.jpg",
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Hardware & Repair Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Tech repair ${idx + 1}`}
              className="rounded-lg shadow hover:shadow-lg transition duration-300 object-cover w-full h-64"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
