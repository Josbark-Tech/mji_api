"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type_actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Type_actor.hasMany(models.Actor, {
        foreignKey: 'typeactor_id'
      });
    }
  }
  Type_actor.init(
    {
      type_actor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Type_actor",
    }
  );
  return Type_actor;
};
