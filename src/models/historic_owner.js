'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historic_owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  historic_owner.init({
    id_historique: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    id_owner: DataTypes.STRING,
    name_owner: DataTypes.STRING,
    postname_owner: DataTypes.STRING,
    firstname_owner: DataTypes.STRING,
    dateofbirth: DataTypes.DATE,
    nationality: DataTypes.STRING,
    staffId: DataTypes.INTEGER,
    version: DataTypes.INTEGER,
    action: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'historic_owner',
  });
  return historic_owner;
};