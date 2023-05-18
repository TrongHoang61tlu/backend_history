import db from "../models";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCrudPage = async (req, res) => {
  return res.render("crudPage.ejs");
};

let postCrud = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayGetCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);

    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("User not found!");
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserData(data);
  return res.redirect("/get-crud");
};

let deleteCrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("delete the user successfully");
  } else {
    return res.send("user not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getCrudPage: getCrudPage,
  postCrud: postCrud,
  displayGetCrud: displayGetCrud,
  getEditCrud: getEditCrud,
  putCrud: putCrud,
  deleteCrud: deleteCrud,
};
