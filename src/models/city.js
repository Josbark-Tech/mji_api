"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.City.belongsTo(models.Province, {
        foreignKey: {
          allowNull: false,
          name: "province_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  City.init(
    {
      city_name: DataTypes.STRING,
      province_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
