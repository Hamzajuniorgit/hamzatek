// components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout, updateAvatar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef();
  const modalRef = useRef();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarVersion, setAvatarVersion] = useState(Date.now());
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [previewAvatar, setPreviewAvatar] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored).avatar : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    try {
      setPreviewAvatar(stored ? JSON.parse(stored).avatar : null);
    } catch {
      setPreviewAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsAvatarModalOpen(false);
    };
    const handleOutsideModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsAvatarModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideModal);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideModal);
    };
  }, []);

  const normalizeAvatarUrl = (avatar) => {
    if (!avatar) return "/default-avatar.jpeg";
    return avatar.startsWith("http")
      ? avatar
      : `http://localhost:5173${avatar}`;
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const roleDashboardPaths = {
    admin: "/admin",
    teacher: "/teacher-dashboard",
    student: "/student-dashboard",
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setUploadError("Invalid file type.");
      toast.error("Use JPEG, PNG, or JPG.");
      return;
    }

    if (file.size > maxSize) {
      setUploadError("File exceeds 5MB.");
      toast.error("File too large.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploading(true);
    setUploadProgress(0);
    try {
      const res = await axiosInstance.post("/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      const avatarPath = res.data.avatar;
      const fullUrl = normalizeAvatarUrl(avatarPath);
      updateAvatar(fullUrl);
      setAvatarVersion(Date.now());
      toast.success("Avatar updated!");
    } catch (err) {
      console.error("Upload error", err);
      setUploadError("Failed to upload.");
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-blue-600"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 mr-2 rounded-full"
          />
          <span className="hidden md:inline">Hamzatek</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-medium ${
              isActive("/")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={`font-medium ${
              isActive("/projects")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Projects
          </Link>
          <Link
            to="/services"
            className={`font-medium ${
              isActive("/services")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`font-medium ${
              isActive("/contact")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/gallery"
            className={`font-medium ${
              isActive("/gallery")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Gallery
          </Link>

          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="rounded-full"
              >
                <img
                  src={`${normalizeAvatarUrl(
                    previewAvatar
                  )}?v=${avatarVersion}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white border rounded-lg shadow-xl p-4 z-50">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`${normalizeAvatarUrl(
                        previewAvatar
                      )}?v=${avatarVersion}`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <label
                    htmlFor="avatar-upload"
                    className="text-xs font-medium mb-1 block"
                  >
                    Update Avatar
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="bg-blue-100 text-blue-700 text-sm px-4 py-2 rounded-lg cursor-pointer block mb-2"
                  >
                    {isUploading
                      ? `Uploading... ${uploadProgress}%`
                      : "Choose File"}
                  </label>
                  {uploadError && (
                    <p className="text-xs text-red-600">{uploadError}</p>
                  )}

                  <Link
                    to={roleDashboardPaths[user.role]}
                    className="block py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm text-red-600 hover:bg-gray-100 py-2 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-6 space-y-4">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Projects
          </Link>
          <Link
            to="/services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Services
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
          <Link
            to="/gallery"
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Gallery
          </Link>

          {user ? (
            <>
              <Link
                to={roleDashboardPaths[user.role]}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-medium text-gray-700 hover:text-blue-600"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div
            ref={modalRef}
            className="relative bg-white p-4 rounded-lg shadow-lg"
          >
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <img
              src={`${normalizeAvatarUrl(previewAvatar)}?v=${avatarVersion}`}
              alt="Full Avatar"
              className="max-w-full max-h-[80vh] rounded"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
