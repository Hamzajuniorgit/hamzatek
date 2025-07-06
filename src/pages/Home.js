// pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TermsModal from "../components/TermsModal";
import { Helmet } from "react-helmet";

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (!accepted) {
      setShowModal(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Helmet>
        <title>Home | Hamza Tech Solutions</title>
        <meta
          name="description"
          content="Welcome to Hamza Tech Solutions. Explore our courses and unlock your potential with expert-led training."
        />
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.hamzatechsolutions.com" />
        <meta
          name="keywords"
          content="Hamza Tech Solutions, online courses, e-learning, education, training"
        />
        <meta name="author" content="Hamza Barisa" />
        <meta property="og:title" content="Hamza Tech Solutions" />
      </Helmet>
      {showModal && <TermsModal onAccept={handleAccept} />}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Unlock Your Potential
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Discover world-class courses from expert instructors. Learn at your
          own pace, anywhere, anytime.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Diverse Courses
              </h3>
              <p className="text-gray-600 mt-2">
                Explore a wide range of topics from coding to creative arts.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Expert Instructors
              </h3>
              <p className="text-gray-600 mt-2">
                Learn from industry leaders with years of experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-800">
                Flexible Learning
              </h3>
              <p className="text-gray-600 mt-2">
                Study at your own pace with lifetime access to courses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
