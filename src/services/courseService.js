// src/services/courseService.js

import axiosInstance from "./axiosInstance";

export const getPublishedCourses = () => {
  return axiosInstance.get("/courses/all"); // your backend route
};
