'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('folder_parcels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_folder: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      deed_of_sale: {
        type: Sequelize.STRING
      },
      lodgers_book: {
        type: Sequelize.STRING
      },
      pv_measurement_demarcation: {
        type: Sequelize.STRING
      },
      deed_of_assignement: {
        type: Sequelize.STRING
      },
      parcelId: {
        type: Sequelize.INTEGER,
        /*references: {
          model: "parcels",
          key: "id",
        },*/
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
    await queryInterface.dropTable('folder_parcels');
  }
};