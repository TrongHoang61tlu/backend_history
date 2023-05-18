import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user is already exist
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password", "token", "id", "firstName", "lastName"],
          raw: true,
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            const token = jwt.sign(
              { email: user.email, roleId: user.roleId },
              "test",
              {
                expiresIn: "1h", // Set the expiration time as desired
              }
            );
            await db.User.update(
              {
                token: token,
              },
              {
                where: { id: user.id },
              }
            );
            userData.errCode = 0;
            userData.errMessage = " Ok";
            user.token = token;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 2;
            userData.errMessage = "Wrong password";
          }
        } else {
          (userData.errCode = 2), (userData.errMessage = `User's not found`);
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exits in your system. Please enter your email`;
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let usser = await db.User.findOne({
        where: { email: userEmail },
      });
      if (usser) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes:{
            exclude: ['password']
          }
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes:{
            exclude: ['password']
          }
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getUsers: getUsers,
};
