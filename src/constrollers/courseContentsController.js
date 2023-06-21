import courseContentService from '../services/courseContentService'

let handleGetCourseContent = async (req, res) => {
    let id = req.query.id;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errCodeMessage: "Missing required parameter",
        coursesContent: [],
      });
    }
    let coursesContent = await courseContentService.getCourseContens(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: " OK",
      coursesContent,
    });
  };

let handleCreateNewCourseContent = async (req, res) => {
    let message = await courseContentService.createNewCourseContent(req.body);
    console.log(message);
    return res.status(200).json(message);
  };

let handleEditCourseContent = async (req, res) => {
    let data = req.body;
    let message = await courseContentService.updateCourseContent(data);
    return res.status(200).json(message);
  };

let handleDeleteCourseContent = async (req, res) => {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let message = await courseContentService.deleteCourseContent(req.body.id);
    return res.status(200).json(message);
  };

module.exports = {
    handleGetCourseContent : handleGetCourseContent,
    handleCreateNewCourseContent :handleCreateNewCourseContent,
    handleEditCourseContent: handleEditCourseContent,
    handleDeleteCourseContent : handleDeleteCourseContent,
}