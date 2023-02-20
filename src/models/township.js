'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class township extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.township.belongsTo(models.district, {
        foreignKey: {
          allowNull: false,
          name:"districtId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      models.township.hasMany(models.quarter)
    }
  };
  township.init({
    id_township: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_township: DataTypes.STRING,
    image_township: DataTypes.STRING,
    history_township: DataTypes.TEXT,
    surface_township: DataTypes.FLOAT,
    districtId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'township',
  });
  return township;
};