"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Event.belongsTo(models.Country, {
        foreignKey: {
          allowNull: false,
          name: "country_id",
        },
      });
      models.Event.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Event.belongsTo(models.Type_event, {
        foreignKey: {
          allowNull: false,
          name: "typeevent_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Event.hasMany(models.Ticket, {
        foreignKey: 'event_id'
      });
      models.Event.hasMany(models.To_participate, {
        foreignKey: 'event_id'
      });
      models.Event.hasMany(models.Actors_event, {
        foreignKey: 'event_id'
      });
      models.Event.hasMany(models.File_ticket, {
        foreignKey: 'event_id'
      });
    }
  }
  Event.init(
    {
      name_event: DataTypes.STRING,
      path_picture_event: DataTypes.STRING,
      number_place: DataTypes.INTEGER,
      number_ticket: DataTypes.INTEGER,
      tab_name_ticket: DataTypes.JSON,
      tab_place_ticket: DataTypes.JSON,
      is_private: DataTypes.BOOLEAN,
      tab_name_category: DataTypes.JSON,
      tab_price_ticket: DataTypes.JSON,
      tab_ticket_and_price: DataTypes.JSON,
      tab_invite: DataTypes.JSON,
      tab_date_event: DataTypes.JSON,
      tab_time_event: DataTypes.JSON,
      tab_date_event_and_time: DataTypes.JSON,
      tab_ticket_and_places: DataTypes.JSON,
      address_event: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      typeevent_id: DataTypes.INTEGER,
      typeuser_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
