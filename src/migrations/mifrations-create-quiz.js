'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quizs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.TEXT
      },
      option1: {
        type: Sequelize.TEXT
      },
      option2: {
        type: Sequelize.TEXT
      },
      option3: {
        type: Sequelize.TEXT
      },  
      option4: {
        type: Sequelize.TEXT
      },
      answer: {
        type: Sequelize.TEXT
      },  
      contentId: {
        type: Sequelize.INTEGER
      } ,  
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
    await queryInterface.dropTable('quizs');
  }
};