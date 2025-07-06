import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import { getPublishedCourses } from "../services/courseService";
import {
  getMyEnrollments,
  enrollToCourse,
  unenrollFromCourse,
} from "../services/enrollmentService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses and enrollments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          getPublishedCourses(),
          user ? getMyEnrollments() : Promise.resolve({ data: [] }),
        ]);
        setCourses(coursesRes.data.courses || []);
        setEnrolledCourses(enrollmentsRes.data.map((e) => e.course_id) || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleEnroll = async (course) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await enrollToCourse(course.id);
      toast.success("Successfully enrolled in course!");
      setEnrolledCourses([...enrolledCourses, course.id]);
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll in course.");
    }
  };

  const handleUnenroll = async (course) => {
    try {
      await unenrollFromCourse(course.id);
      toast.success("Successfully unenrolled from course!");
      setEnrolledCourses(enrolledCourses.filter((id) => id !== course.id));
    } catch (error) {
      console.error("Unenrollment error:", error);
      toast.error("Failed to unenroll from course.");
    }
  };

  const handleViewDetails = (course) => {
    navigate(`/courses/${course.id}`);
  };

  // Filter courses based on search and level
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (levelFilter ? course.level === levelFilter : true)
  );

  return (
    <>
      <Helmet>
        <title>Explore Courses | Hamza Tech Solutions</title>
        <meta
          name="description"
          content="Browse and enroll in a variety of courses to enhance your skills and knowledge."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-100 pt-20">
        {/* Header */}
        <section className="bg-white shadow-md py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Courses
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <p className="text-gray-600 text-center">Loading courses...</p>
            ) : filteredCourses.length === 0 ? (
              <p className="text-gray-600 text-center">No courses found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnrollClick={handleEnroll}
                    onUnenrollClick={handleUnenroll}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;
