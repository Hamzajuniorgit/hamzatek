import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../services/api";
import Modal from "../components/Modal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);

      if (response && response.data && response.data.token) {
        const { token, user } = response.data;

        login({ token, user }); // ✅ sets user + token in context and localStorage

        toast.success("Login successful!");

        // Navigate based on role
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
          navigate("/admin");
        } else if (decoded.role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (decoded.role === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (err) {
      console.error(err);

      const status = err?.response?.status;
      const message = err?.response?.data?.msg;

      if (status === 404 && message === "User not found") {
        toast.error("Email not registered.");
        setShowRegisterModal(true);
      } else if (status === 401 && message === "Invalid password") {
        toast.error("Incorrect password.");
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          <a href="/">Welcome Back</a>
        </h2>

        <div className="mb-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            required
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
              ></path>
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between items-center mt-4">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Forgot password?
          </a>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FaFacebook /> Login with Facebook
          </a>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </form>
      {showRegisterModal && (
        <Modal
          title="You are not registered"
          message="Would you like to create an account?"
          confirmText="Register"
          cancelText="Cancel"
          onConfirm={() => {
            setShowRegisterModal(false);
            navigate("/register");
          }}
          onCancel={() => setShowRegisterModal(false)}
        />
      )}
    </div>
  );
};

export default Login;
