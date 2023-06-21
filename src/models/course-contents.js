"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course_content.belongsTo(models.Courses, {foreignKey: 'courseID'});
      Course_content.hasOne(models.Video, {foreignKey: 'contentID', as : 'Video'});
      Course_content.hasMany(models.Quizs, {foreignKey: 'contentId', as : 'Quizs'});
    }
  }
  Course_content.init(
    {
      chapter: DataTypes.STRING,
      chapterName: DataTypes.STRING,
      lecture: DataTypes.STRING,
      description: DataTypes.TEXT,
      courseID: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Course_content",
      tableName: "Course_content",
    }
  );
  return Course_content;
};
