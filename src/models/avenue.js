'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.avenue.belongsTo(models.quarter, {
        foreignKey: {
          allowNull: false,
          name:"quarterId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      models.avenue.hasMany(models.parcel)
    }
  };
  avenue.init({
    id_avenue: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_avenue: DataTypes.STRING,
    quarterId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'avenue',
  });
  return avenue;
};