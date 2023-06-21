'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Course_content', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chapter: {
        type: Sequelize.STRING
      },
      chapterName: {
        type: Sequelize.STRING
      },
      lecture: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      courseID: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Course_content');
  }
};