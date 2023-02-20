'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  buyer.init({
    id_buyer: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_buyer: DataTypes.STRING,
    postname_buyer: DataTypes.STRING,
    phonenumber_buyer: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'buyer',
  });
  return buyer;
};