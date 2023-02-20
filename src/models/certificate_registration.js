'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class certificate_registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*models.certificate_registration.belongsTo(models.parcel, {
        foreignKey: {
          allowNull: false,
          name: "parcelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });*/
    }
  };
  certificate_registration.init({
    id_certificate: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cadastral_number: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    altitude: DataTypes.FLOAT,
    name_conservative: DataTypes.STRING,
    volume: DataTypes.STRING,
    folio: DataTypes.STRING,
    situation: DataTypes.TEXT,
    description: DataTypes.STRING,
    surface: DataTypes.STRING,
    sketch: DataTypes.STRING,
    parcelId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'certificate_registration',
  });
  return certificate_registration;
};