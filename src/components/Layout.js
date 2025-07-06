// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* Add padding-top here to offset the fixed navbar */}
      <main className="pt-20 min-h-screen bg-gray-50 px-4">
        <Outlet />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
