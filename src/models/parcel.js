'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class parcel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.parcel.belongsTo(models.owner, {
        foreignKey: {
          allowNull: false,
          name:"ownerId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      models.parcel.belongsTo(models.avenue, {
        foreignKey: {
          allowNull: false,
          name:"avenueId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      // models.parcel.hasMany(models.certificate_registration)
      // models.parcel.hasMany(models.folder_parcel)
    }
  };
  parcel.init({
    id_parcel: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ownerId: DataTypes.INTEGER,
    avenueId: DataTypes.INTEGER,
    number_parcel: DataTypes.STRING,
    version:  {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    action: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'parcel',
  });
  return parcel;
};