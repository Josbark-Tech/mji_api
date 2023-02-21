const { Type_actor, sequelize } = require("../models");

const addTypeActor = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { type_user } = res;
      const typeUserFind = await Type_actor.findOne({
        where: { type_user: type_user },
      });
      if (typeUserFind) {
        return res.status(400).json({
          message: "Type_actor already exists",
        });
      } else {
        const typeUserCreated = await Type_actor.create(res);
        if (typeUserCreated) {
          return res.status(200).json({
            message: `Type_actor ${typeUserCreated.type_user} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating user, please try again",
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
          exclude: ["deletedAt", "createdAt"],
          order: ["id", "DESC"],
        },
      })
    );  
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};

const getOneTypeActor = async (req, res) => {
  const { id_typeevent } = res;
  const typeUserFind = await Type_actor.findOne({
    where: { id: id_typeevent },
    attributes: { exclude: ["id", "deletedAt", "createdAt"] },
  });
  if (typeUserFind) {
    res.status(200).json(typeUserFind);
  } else {
    res.status(400).json({
      message: `Type user with ID ${id_typeevent} cannot be found  `,
    });
  }
};

module.exports = {
  addTypeActor,
  getAllTypeActors,
  getOneTypeActor,
};
