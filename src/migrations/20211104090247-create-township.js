'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('townships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_township: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name_township: {
        type: Sequelize.STRING
      },
      image_township:{
        type: Sequelize.STRING
      },
      history_township: {
        type: Sequelize.TEXT
      },
      surface_township: {
        type: Sequelize.FLOAT
      },
      districtId: {
        type: Sequelize.INTEGER,
        references: {
          model: "districts",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('townships');
  }
};