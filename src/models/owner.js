'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.owner.belongsTo(models.staff, {
        foreignKey: {
          allowNull: false,
          name:"staffId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });
      models.owner.hasMany(models.parcel)
    }
  };
  owner.init({
    id_owner:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name_owner: DataTypes.STRING,
    postname_owner: DataTypes.STRING,
    firstname_owner: DataTypes.STRING,
    dateofbirth: DataTypes.DATE,
    nationality: DataTypes.STRING,
    staffId: DataTypes.INTEGER,
    version:  {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    sequelize,
    paranoid:true,
    modelName: 'owner',
  });
  return owner;
};