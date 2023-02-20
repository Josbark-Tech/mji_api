"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Province.belongsTo(models.Country, {
        foreignKey: {
          allowNull: false,
          name: "country_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Province.hasMany(models.City, {
        foreignKey: 'province_id'
      });
    }
  }
  Province.init(
    {
      province_name: DataTypes.STRING,
      country_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Province",
    }
  );
  return Province;
};
