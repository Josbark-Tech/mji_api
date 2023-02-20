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
          message: "Type_user already exists",
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
module.exports = addTypeEvent;
