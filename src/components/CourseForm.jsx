import React, { useState } from 'react';

const CourseForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded">
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Course
      </button>
    </form>
  );
};

export default CourseForm;
