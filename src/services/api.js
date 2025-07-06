// src/services/api.js
import axiosInstance from "./axiosInstance";

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error) {
    throw error;
  }
};
// logout user
export const logoutUser = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get all courses
export const getAllCourses = async () => {
  try {
    const res = await axiosInstance.get("/courses/all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Assign course to teacher
export const assignCourse = async (teacherId, courseId) => {
  try {
    const res = await axiosInstance.post("/courses/assign-teacher", {
      courseId,
      teacher_id: teacherId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Update course
export const updateCourse = async (courseId, updatedData) => {
  try {
    const res = await axiosInstance.put(
      `/courses/update/${courseId}`,
      updatedData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Delete course
export const deleteCourse = async (courseId) => {
  try {
    const res = await axiosInstance.delete(`/courses/delete/${courseId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Publish course
export const publishCourse = async (courseId) => {
  try {
    const res = await axiosInstance.patch(`/courses/publish/${courseId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Unpublish course
export const unpublishCourse = async (courseId) => {
  try {
    const res = await axiosInstance.patch(`/courses/unpublish/${courseId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get all students
export const getAllStudents = async () => {
  try {
    const res = await axiosInstance.get("/students");
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get all teachers
export const getAllTeachers = async () => {
  try {
    const res = await axiosInstance.get("/teachers");
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get all courses for a student
export const getCoursesForStudent = async (studentId) => {
  try {
    const res = await axiosInstance.get(`/students/${studentId}/courses`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Assign course to student
export const assignCourseToStudent = async (studentId, courseId) => {
  try {
    const res = await axiosInstance.post(`/students/${studentId}/assign`, {
      courseId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Unassign course from student
export const unassignCourseFromStudent = async (studentId, courseId) => {
  try {
    const res = await axiosInstance.post(`/students/${studentId}/unassign`, {
      courseId,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get all courses for a teacher
export const getCoursesForTeacher = async (teacherId) => {
  try {
    const res = await axiosInstance.get(`/teachers/${teacherId}/courses`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
// update user
export const updateUser = async (userId, updatedData) => {
  try {
    const res = await axiosInstance.put(`/users/update/${userId}`, updatedData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Delete user
export const deleteUser = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/users/delete/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
// Get all categories
export const getAllCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// src/services/api.js
export const loginUser = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};
