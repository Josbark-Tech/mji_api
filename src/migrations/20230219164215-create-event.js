"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_event: {
        type: Sequelize.STRING,
      },
      path_picture_event: {
        type: Sequelize.STRING,
      },
      number_place: {
        type: Sequelize.INTEGER,
      },
      number_ticket: {
        type: Sequelize.INTEGER,
      },
      tab_name_ticket: {
        type: Sequelize.JSON,
      },
      tab_place_ticket: {
        type: Sequelize.JSON,
      },
      is_private: {
        type: Sequelize.BOOLEAN,
      },
      tab_name_category: {
        type: Sequelize.JSON,
      },
      tab_price_ticket: {
        type: Sequelize.JSON,
      },
      tab_ticket_and_price: {
        type: Sequelize.JSON,
      },
      tab_invite: {
        type: Sequelize.JSON,
      },
      tab_date_event: {
        type: Sequelize.JSON,
      },
      tab_time_event: {
        type: Sequelize.JSON,
      },
      tab_date_event_and_time: {
        type: Sequelize.JSON,
      },
      tab_ticket_and_places: {
        type: Sequelize.JSON,
      },
      address_event: {
        type: Sequelize.STRING,
      },
      country_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      typeevent_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Type_events",
          key: "id",
        },
      },
      typeuser_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
