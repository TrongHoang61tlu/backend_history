import db from "../models/index";

let getHistories = (historiesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let histories = "";
      if (historiesId === "ALL") {
        histories = await db.Histories.findAll();
      }
      if (historiesId && historiesId !== "ALL") {
        histories = await db.Histories.findOne();
      }
      resolve(histories);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewHistories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Histories.create({
        courseID: data.courseID,
        contentID: data.contentID,
        userID: data.userID,
        learningTime: data.learningTime,
        score: data.score,
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

module.exports = {
  getHistories: getHistories,
  createNewHistories: createNewHistories,
};
