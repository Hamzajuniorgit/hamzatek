import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// Sample Logo (replace with actual logo or <img src="..." />)
const LOGO_TEXT = "Hamza Tech Solutions";

const SOCIAL_LINKS = {
  facebook: "https://facebook.com/yourpage",
  twitter: "https://twitter.com/yourhandle",
  instagram: "https://instagram.com/yourpage",
  linkedin: "https://linkedin.com/in/yourprofile",
};

const CONTACT_INFO = {
  email: "support@hamzatechsltns.com",
  phone: "+254790301457",
  location: "https://goo.gl/maps/yourbusinesslocation",
};

const Footer = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Left Column: Logo & About */}
        <div className="text-center md:text-left space-y-4">
          <div className="text-2xl font-bold text-white">
            {/* Replace this with your image if available */}
            <img
              src="/logo.png"
              alt="Logo"
              className="h-20 w-20 inline-block ml-2 rounded-full mr-2"
            />
            <span className="hidden md:inline">{LOGO_TEXT}</span>
          </div>
          <p className="text-gray-400">
            Empowering innovation through technology. We build modern web
            solutions for tomorrow’s problems.
          </p>
        </div>

        {/* Center Column: Navigation */}
        <nav className="text-center space-y-2" aria-label="Footer Navigation">
          <div>
            <Link to="/about" className="block text-gray-300 hover:text-white">
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-300 hover:text-white"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy"
              className="block text-gray-300 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="block text-gray-300 hover:text-white">
              Terms of Service
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="block text-gray-300 hover:text-white underline mt-2"
                role="link"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Right Column: Social + Contact */}
        <div className="text-center md:text-right space-y-4">
          {/* Social Media */}
          <div className="flex justify-center md:justify-end gap-4 text-xl">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-300 hover:text-white"
            >
              <FaFacebook aria-hidden="true" title="Facebook" />
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-300 hover:text-white"
            >
              <FaTwitter aria-hidden="true" title="Twitter" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-300 hover:text-white"
            >
              <FaInstagram aria-hidden="true" title="Instagram" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-white"
            >
              <AiFillLinkedin aria-hidden="true" title="LinkedIn" />
            </a>
          </div>

          {/* Contact Info */}
          <address className="not-italic flex flex-col items-center md:items-end gap-2 text-gray-400">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-white"
              title="Email"
            >
              <MdEmail className="inline mr-1" />
              {CONTACT_INFO.email}
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="hover:text-white"
              title="Call"
            >
              <BsFillTelephoneFill className="inline mr-1" />
              {CONTACT_INFO.phone}
            </a>
            <a
              href={CONTACT_INFO.location}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              title="Location"
            >
              <HiLocationMarker className="inline mr-1" />
              View Location
            </a>
          </address>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Hamza Tech Solutions. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
