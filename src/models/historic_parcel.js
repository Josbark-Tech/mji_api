'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historic_parcel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  historic_parcel.init({
    id_historic_parcel: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    id_parcelle: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    avenueId: DataTypes.INTEGER,
    number_parcel: DataTypes.STRING,
    version: DataTypes.INTEGER,
    action:DataTypes.STRING,
  }, {
    sequelize,
    paranoid:true,
    modelName: 'historic_parcel',
  });
  return historic_parcel;
};