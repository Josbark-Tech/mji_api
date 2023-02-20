'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quarters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_quarter: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name_quarter: {
        type: Sequelize.STRING
      },
      history_quarter: {
        type: Sequelize.STRING
      },
      surface_quarter: {
        type: Sequelize.FLOAT,
      },
      townshipId: {
        type: Sequelize.INTEGER,
        references: {
          model: "townships",
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
    await queryInterface.dropTable('quarters');
  }
};