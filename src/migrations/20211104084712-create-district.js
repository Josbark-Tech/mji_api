'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('districts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_district: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name_district: {
        type: Sequelize.STRING
      },
      surface_district: {
        type: Sequelize.STRING
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references:{
          model:"provinces",
          key: "id",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('districts');
  }
};