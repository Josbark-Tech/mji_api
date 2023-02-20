"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type_event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Type_event.hasMany(models.Event);
    }
  }
  Type_event.init(
    {
      nametype_event: DataTypes.STRING,
      description: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Type_event",
    }
  );
  return Type_event;
};
