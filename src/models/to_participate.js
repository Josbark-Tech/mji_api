"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class To_participate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.To_participate.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: "user_id",
        },
        onUpdate: "CASCADE",
      });
      models.To_participate.belongsTo(models.Event, {
        foreignKey: {
          allowNull: false,
          name: "event_id",
        },
        onUpdate: "CASCADE",
      });
    }
  }
  To_participate.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "To_participate",
    }
  );
  return To_participate;
};
