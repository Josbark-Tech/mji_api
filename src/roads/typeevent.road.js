const express = require("express");
const typeEventRegisteMiddleware = require("../middlewares/typeevent.create.middleware");
const { addTypeEvent, getAllTypeEvents } = require("../controllers");

const typeEventRoads = express.Router();

typeEventRoads.get("/all", getAllTypeEvents);
typeEventRoads.post("/add",typeEventRegisteMiddleware, addTypeEvent);

module.exports = { typeEventRoads };
