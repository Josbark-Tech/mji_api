"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.staff.hasMany(models.owner);
    }
  }
  staff.init(
    {
      id_staff: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name_staff: DataTypes.STRING,
      firstname_staff: DataTypes.STRING,
      postname_staff: DataTypes.STRING,
      personnalnumber: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      sexe: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "staff",
    }
  );
  return staff;
};
