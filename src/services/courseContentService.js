import { response } from "express";
import db from "../models/index";

let getCourseContens = (courseContentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courseContents = "";
      if (courseContentId === "ALL") {
        courseContents = await db.Course_content.findAll();
      }
      if (courseContentId && courseContentId !== "ALL") {
        courseContents = await db.Course_content.findOne({
          where: { id: courseContentId },
        });
      }
      resolve(courseContents);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewCourseContent = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Course_content.create({
          chapter: data.chapter,
          chapterName: data.chapterName,
          lecture: data.lecture,
          description: data.description,
          courseID : data.courseID,
          status: data.status,
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
  
let updateCourseContent = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.id) {
          resolve({
            errCode: 2,
            errMessage: "Missing required parameter",
          });
        }
        let courseContent = await db.Course_content.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (courseContent) {
            courseContent.chapter = data.chapter;
            courseContent.chapterName = data.chapterName;
            courseContent.lecture = data.lecture;
            courseContent.description = data.description;
            courseContent.courseID = data.courseID;
            courseContent.status = data.status;
          await courseContent.save();
          resolve({
            errCode: 0,
            message: "Update the course content successfully",
          });
        } else {
          resolve({
            errCode: 1,
            message: "Course content not found",
          });
        }
      } catch (e) {
        reject(e);
      }
    });
  };

let deleteCourseContent =  (courseContentId) => {
    return new Promise(async (resolve, reject) => {
      let courseContent = await db.Course_content.findOne({
        where: { id: courseContentId },
      });
      if (!courseContent) {
        resolve({
          errCode: 2,
          errMessage: `The course isn't exits`,
        });
      }
      await db.Course_content.destroy({
        where: { id: courseContentId },
      });
      resolve({
        errCode: 0,
        message: `The course is deleted successfully`,
      });
    });
  };

module.exports = {
    getCourseContens : getCourseContens,
    createNewCourseContent:createNewCourseContent,
    updateCourseContent : updateCourseContent,
    deleteCourseContent : deleteCourseContent, 
}