import db from "../models/index";

let getNews = (newsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let news = "";
      if (newsId === "ALL") {
        news = await db.News.findAll();
      }
      if (newsId && newsId !== "ALL") {
        news = await db.News.findOne({
          where: { id: newsId },
        });
      }
      resolve(news);
    } catch (e) {
      reject(e);
    }
  });
};

let createNews = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.News.create({
        title: data.title,
        description: data.description,
        linkUrl: data.linkUrl,
        imageUrl: data.imageUrl,
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

let editNews = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let news = await db.News.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (news) {
        news.title = data.title;
        news.description = data.description;
        news.linkUrl = data.linkUrl;
        if (data.imageUrl) {
          news.imageUrl = data.imageUrl;
        }
        await news.save();
        resolve({
          errCode: 0,
          message: "Update the news successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "News not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteNews = (newsId) => {
  return new Promise(async (resolve, reject) => {
    let news = await db.News.findOne({
      where: { id: newsId },
    });
    if (!news) {
      resolve({
        errCode: 2,
        errMessage: "The news is not exist",
      });
    }
    await db.News.destroy({
      where: { id: newsId },
    });
    resolve({
      errCode: 0,
      message: "The news is deleted successfully",
    });
  });
};

module.exports = {
  getNews: getNews,
  createNews: createNews,
  editNews: editNews,
  deleteNews: deleteNews,
};
