const { Type_user, sequelize } = require("../models");

const addTypeUser = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { type_user } = res;
      const typeUserFind = await Type_user.findOne({
        where: { type_user: type_user },
      });
      if (typeUserFind) {
        return res.status(400).json({
          message: "Type_user already exists",
        });
      } else {
        const typeUserCreated = await Type_user.create(res);
        if (typeUserCreated) {
          return res.status(200).json({
            message: `Type_user ${typeUserCreated.type_user} created`,
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

const getAllTypeUsers = async (req, res) => {
  try {
    res.status(200).send(
      await Type_user.findAll({
        attributes: {
          exclude: ["deletedAt", "password"],
          order: ["id", "DESC"],
        },
      })
    );  
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};

const getOneTypeUser = async (req, res) => {
  const { id_typeevent } = res;
  const typeUserFind = await Type_user.findOne({
    where: { id: id_typeevent },
    attributes: { exclude: ["id", "deletedAt", "password"] },
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
  addTypeUser,
  getAllTypeUsers,
  getOneTypeUser,
};
