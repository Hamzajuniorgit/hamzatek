import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";

const ContactUs = () => {
  // 🧠 useState helps us manage the form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 📌 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Basic form validation and fake submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "http://localhost:5173/api/contact",
        form
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <div className="pt-24 pb-16 px-4 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 📞 Contact Info */}
        <div className="space-y-6">
          <p className="text-gray-700 text-lg">
            We'd love to hear from you. Reach out with any questions or
            feedback!
          </p>

          <div className="flex items-center space-x-4">
            <MdEmail className="text-blue-500 text-2xl" />
            <span className="text-gray-800">info@elearning.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <BsFillTelephoneFill className="text-blue-500 text-2xl" />
            <span className="text-gray-800">+254 712 345 678</span>
          </div>
          <div className="flex items-center space-x-4">
            <HiLocationMarker className="text-blue-500 text-2xl" />
            <span className="text-gray-800">Garissa University, Kenya</span>
          </div>

          {/* Optional: Embedded Google Map */}
          <div className="mt-6">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127425.89321322984!2d39.58217825185346!3d-0.45340292721664983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18159ec67b7a845b%3A0x5b4a45c87c262138!2sGarissa%20University!5e0!3m2!1sen!2ske!4v1708794899576!5m2!1sen!2ske"
              width="100%"
              height="250"
              className="rounded-lg shadow"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* 📝 Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
