const express = require("express");
const { getAllEvents, addEvent } = require("../controllers");
const  userRegisteMiddleware  = require("../middlewares/user.create.middleware");

const eventRoads = express.Router();

eventRoads.get("/all", getAllEvents);
eventRoads.post("/add", userRegisteMiddleware, addEvent);

module.exports = { eventRoads };