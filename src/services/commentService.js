import db from "../models/index";

let getComment = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comment = "";
      if (commentId === "ALL") {
        comment = await db.Comments.findAll();
      }
      if (commentId && commentId !== "ALL") {
        comment = await db.Comments.findOne({
          where: { id: commentId },
        });
      }
      resolve(comment);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comments.create({
        userId: data.userId,
        contentId: data.contentId,
        username: data.username,
        comment: data.comment,
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
  getComment: getComment,
  createNewComment: createNewComment,
};
