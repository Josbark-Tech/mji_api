'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('certificate_registrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_certificate: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      cadastral_number: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      altitude: {
        type: Sequelize.FLOAT
      },
      name_conservative: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      folio: {
        type: Sequelize.STRING
      },
      situation: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING
      },
      surface: {
        type: Sequelize.STRING
      },
      sketch: {
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
    await queryInterface.dropTable('certificate_registrations');
  }
};