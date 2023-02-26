"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Guest.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false,
          name: "event_id",
        },
        onUpdate: "CASCADE",
      });
    }
  }
  Guest.init(
    {
      user_id: DataTypes.INTEGER,
      name_guest: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      description :DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Guest",
    }
  );
  return Guest;
};
