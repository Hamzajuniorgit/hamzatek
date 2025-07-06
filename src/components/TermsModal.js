// components/TermsModal.js
import React from "react";
import { Link } from "react-router-dom";

function TermsModal({ onAccept }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Before You Continue</h2>
        <p className="text-sm text-gray-600">
          Please read and accept our{" "}
          <Link to="/terms" className="text-blue-600 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </Link>{" "}
          to proceed.
        </p>
        <button
          onClick={onAccept}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          I Agree
        </button>
      </div>
    </div>
  );
}

export default TermsModal;
