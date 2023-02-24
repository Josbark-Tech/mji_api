const express = require("express");
const { getAllEvents, addEvent, getMyEvents, getOneEventCreated, participateInPublicEvent } = require("../controllers");
const  eventCreatedMiddleware  = require("../middlewares/event.create.middleware");
const { validatedOneId } = require('../middlewares/validateOneId.middleware')
const passport = require("passport");
const participateInEventMiddleware = require("../middlewares/participate.event.middleware");

const eventRoads = express.Router();

eventRoads.get("/all", getAllEvents);
eventRoads.post("/add", passport.authenticate("jwt", { session: false }), eventCreatedMiddleware, addEvent);
eventRoads.get("/:id", passport.authenticate("jwt", { session: false }), getOneEventCreated);
eventRoads.get("/myevents", passport.authenticate("jwt", { session: false }), getMyEvents);
eventRoads.post("/participate", passport.authenticate("jwt", { session: false }), participateInEventMiddleware, participateInPublicEvent);

module.exports = { eventRoads };