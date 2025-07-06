import axiosInstance from "./axiosInstance";

export const getMyEnrollments = () =>
  axiosInstance.get("/enrollments/my-courses");

export const unenrollFromCourse = (courseId) =>
  axiosInstance.delete(`/enrollments/unenroll/${courseId}`);

export const enrollToCourse = (courseId) =>
  axiosInstance.post(`/enrollments/enroll/${courseId}`, {});
