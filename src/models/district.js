'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.district.belongsTo(models.province, {
        foreignKey: {
          allowNull: false,
          name:"provinceId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      models.district.hasMany(models.township)
    }
  };
  district.init({
    id_district: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_district: DataTypes.STRING,
    surface_district: DataTypes.STRING,
    provinceId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: "district",
  });
  return district;
};