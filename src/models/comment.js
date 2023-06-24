"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Comments.init(
    {
      userId: DataTypes.INTEGER,
      contentId: DataTypes.INTEGER,
      username : DataTypes.STRING,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
