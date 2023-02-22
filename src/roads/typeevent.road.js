const express = require("express");
const typeEventRegisteMiddleware = require("../middlewares/typeevent.create.middleware");
const { addTypeEvent, getAllTypeEvents } = require("../controllers");
const passport = require("passport");


const typeEventRoads = express.Router();

typeEventRoads.get("/all", getAllTypeEvents);
typeEventRoads.post("/add", passport.authenticate("jwt", { session: false }), typeEventRegisteMiddleware, addTypeEvent);

module.exports = { typeEventRoads };
