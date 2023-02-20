'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  buy.init({
    id_buy: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    serviceId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    means_of_payement: DataTypes.STRING,
    amount_pay: DataTypes.FLOAT
  }, {
    sequelize,
    paranoid:true,
    modelName: 'buy',
  });
  return buy;
};