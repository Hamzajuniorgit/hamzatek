import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard2 from "./pages/AdminDashboard2";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Teachers from "./components/admin/Teachers";
import Students from "./components/admin/Students";
import InactivityWarning from "./components/InactivityWarning";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import MainHome from "./pages/MainHome";
import Gallery from "./pages/Gallery";
import Projects from "./pages/Projects";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <InactivityWarning />
        <Routes>
          {/* 🌍 Public routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<MainHome />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/elearning" element={<Home />} />
          </Route>

          {/* 🔐 Protected routes with Layout */}
          <Route
            path="/dashboard"
            element={<PrivateRoute allowedRoles={["admin", "user"]} />}
          >
            <Route
              path=""
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
          </Route>

          <Route
            path="/admin"
            element={<PrivateRoute allowedRoles={["admin"]} />}
          >
            <Route
              path=""
              element={
                <Layout>
                  <AdminDashboard2 />
                </Layout>
              }
            />
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Students />} />
          </Route>

          <Route
            path="/student-dashboard"
            element={<PrivateRoute allowedRoles={["student"]} />}
          >
            <Route
              path=""
              element={
                <Layout>
                  <StudentDashboard />
                </Layout>
              }
            />
            <Route
              path="my-courses"
              element={
                <Layout>
                  <MyCourses />
                </Layout>
              }
            />
          </Route>

          <Route
            path="/teacher-dashboard"
            element={<PrivateRoute allowedRoles={["teacher"]} />}
          >
            <Route
              path=""
              element={
                <Layout>
                  <TeacherDashboard />
                </Layout>
              }
            />
          </Route>

          {/* 🚪 Public routes without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
