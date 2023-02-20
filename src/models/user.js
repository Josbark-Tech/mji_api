"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Event.belongsTo(models.Type_user, {
        foreignKey: {
          allowNull: false,
          name: "typeuser_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.User.hasMany(models.Ticket, {
        foreignKey: 'user_id'
      });
      models.User.hasMany(models.To_participate, {
        foreignKey: 'user_id'
      });
      models.User.hasMany(models.Actors_event, {
        foreignKey: 'user_id'
      });
      models.User.hasMany(models.Event, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init(
    {
      name_user: DataTypes.STRING,
      lastname_user: DataTypes.STRING,
      firstname: DataTypes.STRING,
      password: DataTypes.STRING,
      sexe: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      typeuser_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
