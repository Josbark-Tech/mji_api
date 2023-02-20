'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class folder_parcel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*models.folder_parcel.belongsTo(models.parcel, {
        foreignKey: {
          allowNull: false,
          name: "parcelId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });*/
    }
  };
  folder_parcel.init({
    id_folder: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    deed_of_sale: DataTypes.STRING,
    lodgers_book: DataTypes.STRING,
    pv_measurement_demarcation: DataTypes.STRING,
    deed_of_assignement: DataTypes.STRING,
    parcelId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'folder_parcel',
  });
  return folder_parcel;
};