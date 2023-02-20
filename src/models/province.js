'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.province.hasMany(models.district)
    }
  };
  province.init({
    id_province: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_province: {
      type: DataTypes.STRING,
      unique: true,
    },
    image_province: DataTypes.STRING,
    history_province: DataTypes.TEXT,
    surface_province: DataTypes.FLOAT,
    chieftown: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'province',
  });
  return province;
};