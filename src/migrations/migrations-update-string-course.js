module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Courses",
          "imageUrl",
          {
            type: Sequelize.STRING,
            allowNull: true,
          }
        ),
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn(
          "Courses",
          "imageUrl",
          {
            type: Sequelize.STRING,
            allowNull: true,
          }
        ),
      ]);
    },
  };
  