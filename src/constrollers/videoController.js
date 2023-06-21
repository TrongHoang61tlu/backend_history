import videoService from "../services/videoService";
import db from "../models/index";

let handleGetVideo = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errCodeMessage: "Missing required parameter",
      video: [],
    });
  }
  let video = await videoService.getVideo(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: " OK",
    video,
  });
};

let handlePostVideo = async (req, res) => {
  let message = await videoService.createNewVideo(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditVideo = async (req, res) => {
  let data = req.body;
  let message = await videoService.updateVideo(data);
  return res.status(200).json(message);
};

let handleDeleteVideo = async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let message = await videoService.deleteVideo(req.body.id);
    return res.status(200).json(message);
  };

module.exports = {
  handleGetVideo: handleGetVideo,
  handlePostVideo: handlePostVideo,
  handleEditVideo: handleEditVideo,
  handleDeleteVideo: handleDeleteVideo,
};
