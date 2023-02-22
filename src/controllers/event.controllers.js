const { Event, sequelize } = require("../models");

const addEvent = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {

    const user_id = req.user.id;
    try {
      const { name_event,
        path_picture_event,
        number_place,
        number_ticket,
        tab_name_ticket,
        tab_place_ticket,
        is_private,
        tab_name_category,
        tab_price_ticket,
        tab_ticket_and_price,
        tab_invite,
        tab_date_event,
        tab_time_event,
        tab_date_event_and_time,
        tab_ticket_and_places,
        address_event,
        country_id,
        typeevent_id } = req.body;
      
      const eventCreated = await Event.create({
        name_event,
        path_picture_event,
        number_place,
        number_ticket,
        tab_name_ticket,
        tab_place_ticket,
        is_private,
        tab_name_category,
        tab_price_ticket,
        tab_ticket_and_price,
        tab_invite,
        tab_date_event,
        tab_time_event,
        tab_date_event_and_time,
        tab_ticket_and_places,
        address_event,
        country_id,
        typeevent_id,
        user_id,
        typeuser_id :req.user.typeuser_id
      });
      if (eventCreated) {
        return res.status(200).json({
          message: `Event ${eventCreated.name_event} created`,
        });
      } else {
        return res.status(400).json({
          message: "Error creating user, please try again",
        });
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
