"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Country.hasMany(models.Province);
      models.Country.hasMany(models.Event);
    }
  }
  Country.init(
    {
      country_name: DataTypes.STRING,
      zip_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
