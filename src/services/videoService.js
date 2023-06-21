import db from "../models/index";

let getVideo = (videoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let video = "";
      if (videoId === "ALL") {
        video = await db.Video.findAll();
      }
      if (videoId && videoId !== "ALL") {
        video = await db.Video.findOne({
          where: { id: videoId },
        });
      }
      resolve(video);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewVideo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Video.create({
        title: data.title,
        videoUrl: data.videoUrl,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        contentID: data.contentID,
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

let updateVideo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let video = await db.Video.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (video) {
        video.title = data.title;
        video.description = data.description;
        if (data.videoUrl) {
          video.videoUrl = data.videoUrl;
        }
        if (data.thumbnailUrl) {
          video.thumbnailUrl = data.thumbnailUrl;
        }
        video.contentID = data.contentID;
        await video.save();
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

let deleteVideo = (videoId) => {
  return new Promise(async (resolve, reject) => {
    let video = await db.Video.findOne({
      where: { id: videoId },
    });
    if (!video) {
      resolve({
        errCode: 2,
        errMessage: `The video isn't exits`,
      });
    }
    await db.Video.destroy({
      where: { id: videoId },
    });
    resolve({
      errCode: 0,
      message: `The video is deleted successfully`,
    });
  });
};

module.exports = {
  getVideo: getVideo,
  createNewVideo: createNewVideo,
  updateVideo: updateVideo,
  deleteVideo: deleteVideo,
};
