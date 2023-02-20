"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class File_ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.File_ticket.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false,
          name: "event_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  File_ticket.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      description: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "File_ticket",
    }
  );
  return File_ticket;
};
