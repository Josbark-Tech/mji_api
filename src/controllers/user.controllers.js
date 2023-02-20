const { User, sequelize } = require("../models");


const addUser = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { email } = res;
      const userFind = await User.findOne({
        where: { email },
      });
      if (userFind) {
        return res.status(400).json({
          message: `User with this email ${email} already exists`,
        });
      } else {
        const userCreated = await User.create(res);
        if (userCreated) {
          return res.status(200).json({
            message: `User ${userCreated.name_user} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating user, please try again",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ erreur: error });
    }
  });
};

const getAllUsers = async (req, res) => {
  try {
    res.status(200).send(
      await User.findAll({
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

const getOneUser = async (req, res) => {
  const { id_user } = res;
  try {
    const userFind = await User.findOne({
      where: { id:id_user },
      attributes: { exclude: ["deletedAt", "password"] },
    });
    if (userFind) {
      res.status(200).json(userFind);
    } else {
      res.status(400).json({
        message: `Personnel with ID ${id_user} cannot be found  `,
      });
    }
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
};
