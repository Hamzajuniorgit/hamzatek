// pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TermsModal from "../components/TermsModal";
import { Helmet } from "react-helmet";

function MainHome() {
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
        <title>Home | Hamzatek</title>
        <meta
          name="description"
          content="Welcome to Hamzatek — Empowering Digital Evolution. Explore my work in web development, e-learning systems, and IT solutions."
        />
        <link rel="icon" href="/logo.png" />
      </Helmet>
      {showModal && <TermsModal onAccept={handleAccept} />}

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Hamzatek
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
          Empowering Digital Evolution — Full-stack web development, IT systems,
          and e-learning platforms.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Explore My Work
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-700 text-lg">
            I'm Hamza Abdinasir Barisa, a full-stack web developer and IT
            systems expert. I specialize in creating powerful web applications,
            e-learning platforms, and smart IT infrastructure solutions. Through
            Hamzatek, I help individuals and businesses thrive in the digital
            world.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            My Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold">Web Development</h3>
              <p className="text-gray-600 mt-2">
                Custom websites and platforms using React, Node.js, MySQL, and
                Tailwind.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">📡</div>
              <h3 className="text-xl font-semibold">IT & Network Systems</h3>
              <p className="text-gray-600 mt-2">
                Design and maintenance of IT systems, networking, and digital
                infrastructure.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold">E-learning Solutions</h3>
              <p className="text-gray-600 mt-2">
                End-to-end development of learning platforms for students and
                instructors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Have a project in mind?</h2>
        <p className="text-lg mb-6">Let’s build something great together.</p>
        <Link
          to="/contact"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Contact Me
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Hamzatek. All rights reserved.
      </footer>
    </div>
  );
}

export default MainHome;
