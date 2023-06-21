"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quizs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quizs.belongsTo(models.Course_content , {foreignKey: "contentId"})
    }
  }
  Quizs.init(
    {
      question: DataTypes.TEXT,
      option1: DataTypes.TEXT,
      option2: DataTypes.TEXT,
      option3: DataTypes.TEXT,
      option4: DataTypes.TEXT,
      answer: DataTypes.TEXT,
      contentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quizs",
    }
  );
  return Quizs;
};
