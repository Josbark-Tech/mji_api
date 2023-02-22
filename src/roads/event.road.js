const express = require("express");
const { getAllEvents, addEvent, getMyEvents, getOneEventCreated } = require("../controllers");
const  eventCreatedMiddleware  = require("../middlewares/event.create.middleware");
const { validatedOneId } = require('../middlewares/validateOneId.middleware')
const passport = require("passport");

const eventRoads = express.Router();

eventRoads.get("/all", getAllEvents);
eventRoads.post("/add", passport.authenticate("jwt", { session: false }), eventCreatedMiddleware, addEvent);
eventRoads.get("/:id", passport.authenticate("jwt", { session: false }), getOneEventCreated);
eventRoads.get("/myevents", passport.authenticate("jwt", { session: false }), getMyEvents);

module.exports = { eventRoads };