"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Ticket.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "user_id",
        },
        onUpdate: "CASCADE",
      });
      models.Ticket.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false,
          name: "event_id",
        },
        onUpdate: "CASCADE",
      });
    }
  }
  Ticket.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      price_ticket: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
