import { response } from "express";
import db from "../models/index";

let getCourses = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courses = "";
      if (courseId === "ALL") {
        courses = await db.Courses.findAll();
      }
      if (courseId && courseId !== "ALL") {
        courses = await db.Courses.findOne({
          where: { id: courseId },
        });
      }
      resolve(courses);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Courses.create({
        title: data.title,
        imageUrl: data.imageUrl,
        description: data.description,
      });
      resolve({
        errCode: 0,
        message: "Thêm thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let course = await db.Courses.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (course) {
        course.title = data.title;
        course.description = data.description;
        if (data.imageUrl) {
          course.imageUrl = data.imageUrl;
        }
        await course.save();
        resolve({
          errCode: 0,
          message: "Update the user successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Course not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCourse = (courseId) => {
  return new Promise(async (resolve, reject) => {
    let course = await db.Courses.findOne({
      where: { id: courseId },
    });
    if (!course) {
      resolve({
        errCode: 2,
        errMessage: `The course isn't exits`,
      });
    }
    await db.Courses.destroy({
      where: { id: courseId },
    });
    resolve({
      errCode: 0,
      message: `The course is deleted successfully`,
    });
  });
};

let getDetailCourseById = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Courses.findAll({
        include: [
          {
            model: db.Course_content,
            as: "CourseContents",
            include: [
              { model: db.Video, as: "Video" },
              { model: db.Quizs, as: "Quizs" },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getCourses: getCourses,
  createNewCourse: createNewCourse,
  updateCourse: updateCourse,
  deleteCourse: deleteCourse,
  getDetailCourseById: getDetailCourseById,
};
