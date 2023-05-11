'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('videos', {
    //     title: DataTypes.STRING,
    //   description: DataTypes.TEXT,
    //   videoUrl: DataTypes.STRING,
    //   thumbnaiUrl: DataTypes.STRING,
    //   contentID: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      videoUrl: {
        type: Sequelize.STRING
      },
      thumbnaiUrl: {
        type: Sequelize.STRING
      },
      contentID: {
        type: Sequelize.INTEGER
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('videos');
  }
};