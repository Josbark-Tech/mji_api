'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  service.init({
    id_service: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_service: DataTypes.STRING,
    cost_service: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'service',
  });
  return service;
};