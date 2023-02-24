const { Event, To_participate, sequelize } = require("../models");

const numberRegex = /^\d{1,}$/;

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
          exclude : ["number_place", "is_private", "tab_name_category", "tab_invite", "tab_time_event", "address_event", "updatedAt", "createdAt", "user_id"],
          order: ["id", "DESC"],
        },
      })
    );
    
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};

const getOneEvent = async (req, res) => {
  const { id } = res.params;
  const idIsNumber = numberRegex.exec(id)
  if (idIsNumber) {
    try {
      const eventFind = await Event.findOne({
        where: { id },
        attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
      });
      if (eventFind) {
        res.status(200).json(eventFind);
      } else {
        res.status(400).json({
          message: `Event with ID ${id} cannot be found  `,
        });
      }
    } catch (error) {
      res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
    }
  } else {
    res.status(400).json({
      message: `ID ${id} is not a number`,
    });
  }
};

const getMyEvents = async (req, res) => {
  try {
    res.status(200).send(
      await Event.findAll({
        where:{ user_id: req.user.id,},
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
  
  const { id } = req.params;
  const idIsNumber = numberRegex.exec(id)
  if (idIsNumber) {
    try {
      res.status(200).send(
        await Event.findOne({
          where:{id},
          attributes: {
            exclude: ["deletedAt", "createdAt", "updatedAt"],
          },
        })
      );
      
    } catch (error) {
      res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
    }
  }else {
    res.status(400).json({
      message: `ID ${id} is not available`,
    });
  }
};
const participateInPublicEvent = async (req, res) => {
  
  const { event_id, participate_in } = req.body;
  const idIsNumber = numberRegex.exec(event_id)
  if (idIsNumber) {
    try {
      const eventFind = await Event.findOne({
        where:{id:event_id,is_private:false},
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
        },
      })
      if(eventFind){
        const numberParticipants = await To_participate.count({
          where :{
            event_id : event_id,
          }
        });
        const numberPlaces = eventFind.number_place;
        if(numberParticipants == numberPlaces){
          return res.status(200).send({
            message: `Sorry, you can't not participate. because the number of participants is reached`,
          });
        }else{
          const userIsParticipant = await To_participate.findOne({
            where :{
              event_id,
              user_id: req.user.id,
            }
          });
          if(userIsParticipant){
            if(participate_in === true){
              return res.status(200).send(
                await To_participate.create({
                  event_id,
                  user_id: req.user.id,
                })
              )
            }else{
              const userToListParticipates = 
              await To_participate.destroy({
                where: {
                  id: userIsParticipant.id
                }
              })
              if(userToListParticipates){
               res.status(200).send({
                message : "User deleted to list participants"
                });
              }else{
                return res.status(500).json({
                  message: `User with ID ${userIsParticipant.user_id} cannot be deleted, please try again`,
                });
              }
            }
          }else{
            const userAddedToList =  
            await To_participate.create({
              event_id,
              user_id: req.user.id,
            }); 
            if (userAddedToList) {
              return res.status(200).json({
                message: `User ${req.user.name_user} added to list`,
              });
            } else {
              return res.status(400).json({
                message: "Error add user to list, please try again",
              });
            }
          }
        }
      }else{
        res.status(400).json({
          message: `Event with ID ${event_id} cannot be found or is not a public event`,
        });
      }
    } catch (error) {
      res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
    }
  }else {
    res.status(400).json({
      message: `ID ${event_id} is not available`,
    });
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  addEvent,
  getMyEvents,
  getOneEventCreated,
  participateInPublicEvent,
};
