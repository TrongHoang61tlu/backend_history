import db from "../models/index";

let getQuizz = (quizzId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quizz = "";
      if (quizzId === "ALL") {
        quizz = await db.Quizs.findAll();
      }
      if (quizzId && quizzId !== "ALL") {
        courses = await db.Quizs.findOne({
          where: { id: quizzId },
        });
      }
      resolve(quizz);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewQuizz = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Quizs.create({
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        answer: data.answer,
        contentId: data.contentId,
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

let updateQuizz = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let quizz = await db.Quizs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (quizz) {
        quizz.question = data.question;
        quizz.option1 = data.option1;
        quizz.option2 = data.option2;
        quizz.option3 = data.option3;
        quizz.option4 = data.option4;
        quizz.answer = data.answer;
        quizz.contentId = data.contentId;
        await quizz.save();
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

let deleteQuizz = (quizzId) => {
  return new Promise(async (resolve, reject) => {
    let quizz = await db.Quizs.findOne({
      where: { id: quizzId },
    });
    if (!quizz) {
      resolve({
        errCode: 2,
        errMessage: `The course isn't exits`,
      });
    }
    await db.Quizs.destroy({
      where: { id: quizzId },
    });
    resolve({
      errCode: 0,
      message: `The course is deleted successfully`,
    });
  });
};

module.exports = {
  getQuizz: getQuizz,
  createNewQuizz: createNewQuizz,
  updateQuizz: updateQuizz,
  deleteQuizz : deleteQuizz,
};
