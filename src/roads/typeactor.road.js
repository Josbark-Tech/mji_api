const express = require("express");
const typeUserRegisteMiddleware = require("../middlewares/typeuser.create.middleware");
const { addTypeUser, getAllTypeActors } = require("../controllers");

const typeActorRoads = express.Router();

typeActorRoads.get("/all", getAllTypeActors);
typeActorRoads.post("/add",typeUserRegisteMiddleware, addTypeUser);

module.exports = { typeActorRoads };
