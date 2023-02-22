const { Event, sequelize } = require("../models");


const addEvent = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { email } = res;
      const userFind = await Event.findOne({
        where: { email },
      });
      if (userFind) {
        return res.status(400).json({
          message: `Event with this email ${email} already exists`,
        });
      } else {
        const userCreated = await Event.create(res);
        if (userCreated) {
          return res.status(200).json({
            message: `Event ${userCreated.name_user} created`,
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

const getAllEvents = async (req, res) => {
  try {
    res.status(200).send(
      await Event.findAll({
        where:{ is_private: false},
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

const getOneEvent = async (req, res) => {
  const { id_user } = res;
  try {
    const userFind = await Event.findOne({
      where: { id:id_user },
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
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

const getMyEvents = async (req, res) => {
  try {
    res.status(200).send(
      await Event.findAll({
        where:{ user_id: false},
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
const getOneEventCreated = async (req, res) => {
  try {
    res.status(200).send(
      await Event.findAll({
        where:{ user_id: false},
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

module.exports = {
  getAllEvents,
  getOneEvent,
  addEvent,
  getMyEvents,
  getOneEventCreated,
};
