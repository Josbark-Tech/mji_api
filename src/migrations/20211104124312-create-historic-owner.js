'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('historic_owners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_historique: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_owner: {
        type: Sequelize.INTEGER
      },
      name_owner: {
        type: Sequelize.STRING
      },
      postname_owner: {
        type: Sequelize.STRING
      },
      firstname_owner: {
        type: Sequelize.STRING
      },
      dateofbirth: {
        type: Sequelize.DATE
      },
      nationality: {
        type: Sequelize.STRING
      },
      staffId: {
        type: Sequelize.INTEGER
      },
      version: {
        type: Sequelize.INTEGER
      },
      action: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('historic_owners');
  }
};