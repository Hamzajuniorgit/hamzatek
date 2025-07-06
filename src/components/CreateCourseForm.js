import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const CreateCourseForm = ({
  user,
  onSuccess,
  initialValues = {},
  courseId = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    level: "",
    ...initialValues, // Prefill form if editing
  });

  useEffect(() => {
    if (
      initialValues &&
      Object.keys(initialValues).length > 0 &&
      (!formData.title || formData.title !== initialValues.title)
    ) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (courseId) {
        await axiosInstance.put(`/courses/update/${courseId}`, formData);
        toast.success("Course updated successfully");
      } else {
        await axiosInstance.post("/courses/create", {
          ...formData,
          teacherId: user.id,
        });
        toast.success("Course created successfully");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Course Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Course Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="level"
        value={formData.level}
        onChange={handleChange}
        placeholder="Level"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        {courseId ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
};

export default CreateCourseForm;
