"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actors_event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Actors_event.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "user_id",
        },
        onUpdate: "CASCADE",
      });
      models.Actors_event.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false,
          name: "event_id",
        },
        onUpdate: "CASCADE",
      });
      models.Actors_event.belongsTo(models.Actor, {
        foreignKey: {
          allowNull: false,
          name: "actor_id",
        },
        onUpdate: "CASCADE",
      });
    }
  }
  Actors_event.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      actor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Actors_event",
    }
  );
  return Actors_event;
};
