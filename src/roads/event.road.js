const express = require("express");
const { getAllEvents, addEvent } = require("../controllers");
const  eventCreatedMiddleware  = require("../middlewares/event.create.middleware");
const passport = require("passport");

const eventRoads = express.Router();

eventRoads.get("/all", getAllEvents);
eventRoads.post("/add", passport.authenticate("jwt", { session: false }), eventCreatedMiddleware, addEvent);

module.exports = { eventRoads };