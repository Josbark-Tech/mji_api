const { Type_actor, sequelize } = require("../models");

const addTypeActor = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { type_actor } = res;
      const typeActorFind = await Type_actor.findOne({
        where: { type_actor },
      });
      if (typeActorFind) {
        return res.status(400).json({
          message: "Type_actor already exists",
        });
      } else {
        const typeActorCreated = await Type_actor.create(res);
        if (typeActorCreated) {
          return res.status(200).json({
            message: `Type_actor ${typeActorCreated.type_actor} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating type actor, please try again",
          });
        }
      }
    } catch (error) {
      return res
        .status(400)
        .json({ erreur: "La requête échouée ", message: `${error} ${t}` });
    }
  });
};

const getAllTypeActors = async (req, res) => {
  try {
    res.status(200).send(
      await Type_actor.findAll({
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
          order: ["id", "DESC"],
        },
      })
    );  
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};

const getOneTypeActor = async (req, res) => {
  const { id_typeactor } = res;
  const typeActorFind = await Type_actor.findOne({
    where: { id: id_typeactor },
    attributes: { exclude: ["id", "deletedAt", "createdAt", "updatedAt"] },
  });
  if (typeActorFind) {
    res.status(200).json(typeActorFind);
  } else {
    res.status(400).json({
      message: `Type actor with ID ${id_typeactor} cannot be found  `,
    });
  }
};

module.exports = {
  addTypeActor,
  getAllTypeActors,
  getOneTypeActor,
};
