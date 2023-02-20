const express = require("express");
const typeEventRegisteMiddleware = require("../create_typeevent/typeevent.create.middleware");
const addTypeEvent = require("../create_typeevent/typeevent.create.controller");

const typeEventRoads = express.Router();

typeEventRoads.post("/add",typeEventRegisteMiddleware, addTypeEvent);

module.exports = { typeEventRoads };
