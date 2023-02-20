'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('owners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_owner: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        type: Sequelize.INTEGER,
        references: {
          model: "staffs",
          key: "id",
        },
      },
      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
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
    await queryInterface.dropTable('owners');
  }
};