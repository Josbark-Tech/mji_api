"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Actor.belongsTo(models.Type_actor, {
        foreignKey: {
          allowNull: false,
          name: "typeactor_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Actor.hasMany(models.Actors_event, {
        foreignKey: 'actor_id'
      });
    }
  }
  Actor.init(
    {
      name_actor: DataTypes.STRING,
      typeactor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
