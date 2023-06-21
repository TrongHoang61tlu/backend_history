import express from "express";
import homeController from "../constrollers/homeController";
import userController from "../constrollers/userControlers";
import courseController from "../constrollers/courseController";
import newsController from "../constrollers/newsController";
import courseContentController from "../constrollers/courseContentsController";
import videoController from "../constrollers/videoController";
import quizzController from "../constrollers/quizzController";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/crud", homeController.getCrudPage);
  router.post("/post-crud", homeController.postCrud);
  router.get("/get-crud", homeController.displayGetCrud);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putCrud);
  router.get("/delete-crud", homeController.deleteCrud);

  //API
  router.post("/api/login", userController.handleLogin);

  //users
  router.get("/api/users", userController.handleGetUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  //courses
  router.get("/api/courses", courseController.handleGetCousers);
  router.post("/api/create-new-course", courseController.handleCreateNewCourse);
  router.put("/api/edit-course", courseController.handleEditCourse);
  router.delete("/api/delete-course", courseController.handleDeleteCourse);

  router.get(
    "/api/get-detail-course-by-id",
    courseController.handleGetDetailCourseById
  );

  //course_content
  router.get(
    "/api/get-course-content",
    courseContentController.handleGetCourseContent
  );
  router.post(
    "/api/create-new-course-content",
    courseContentController.handleCreateNewCourseContent
  );
  router.put(
    "/api/edit-course-content",
    courseContentController.handleEditCourseContent
  );
  router.delete(
    "/api/delete-course-content",
    courseContentController.handleDeleteCourseContent
  );
  //news
  router.get("/api/news", newsController.handleGetNews);
  router.post("/api/create-news", newsController.handleCreateNews);
  router.put("/api/edit-news", newsController.handleEditNews);
  router.delete("/api/delete-news", newsController.handleDeleteNews);

  //Video
  router.get("/api/video", videoController.handleGetVideo);
  router.post("/api/create-video", videoController.handlePostVideo);
  router.put("/api/edit-video", videoController.handleEditVideo);
  router.delete("/api/delete-video", videoController.handleDeleteVideo);

  //Quizzes
  router.get("/api/quizzes", quizzController.handleGetQuizz);
  router.post("/api/create-quizz", quizzController.handleCreateQuizz);
  router.put("/api/edit-quizz", quizzController.handleEditQuizz);
  router.delete("/api/delete-quizz", quizzController.handleDeleteQuizz);

  return app.use("/", router);
};

module.exports = initWebRouters;
