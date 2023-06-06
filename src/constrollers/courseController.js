import courseService from "../services/courseService";

let handleGetCousers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errCodeMessage: "Missing required parameter",
      courses: [],
    });
  }
  let courses = await courseService.getCourses(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: " OK",
    courses,
  });
};

let handleCreateNewCourse = async (req, res) => {
  let message = await courseService.createNewCourse(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditCourse = async (req, res) => {
  let data = req.body;
  let message = await courseService.updateCourse(data);
  return res.status(200).json(message);
};

let handleDeleteCourse = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await courseService.deleteCourse(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetCousers: handleGetCousers,
  handleCreateNewCourse: handleCreateNewCourse,
  handleEditCourse: handleEditCourse,
  handleDeleteCourse: handleDeleteCourse,
};
