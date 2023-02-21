const { Type_event, sequelize } = require("../models");

const addTypeEvent = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { nametype_event } = res;
      const typeEventFind = await Type_event.findOne({
        where: { nametype_event },
      });
      if (typeEventFind) {
        return res.status(400).json({
          message: "Type event already exists",
        });
      } else {
        const typeEventCreated = await Type_event.create(res);
        if (typeEventCreated) {
          return res.status(200).json({
            message: `Type_event ${typeEventCreated.nametype_event} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating type event, please try again",
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

const getAllTypeEvents = async (req, res) => {
  res.status(200).send(
    await Type_event.findAll({
      attributes: {
        exclude: ["deletedAt", "createdAt", "updatedAt", "password"],
        order: ["id", "DESC"],
      },
    })
  );
};

const getOneTypeEvent = async (req, res) => {
  const { id_typeevent } = res;
  const typeEventFind = await Type_event.findOne({
    where: { id: id_typeevent },
    attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
  });
  if (typeEventFind) {
    res.status(200).json(typeEventFind);
  } else {
    res.status(400).json({
      message: `Type user with ID ${id_typeevent} cannot be found  `,
    });
  }
};

module.exports = {
  addTypeEvent,
  getAllTypeEvents,
  getOneTypeEvent,
};
