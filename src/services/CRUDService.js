import bcrypt from "bcrypt";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        phonenumber: data.phonenumber,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("Succeed");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve(null);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        await user.save();
        resolve();
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteUserById =(userId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {id: userId},
      })
      if(user){
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  })
} 
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById:deleteUserById
};
