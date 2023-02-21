const express = require("express");
const typeActorRegisteMiddleware = require("../middlewares/typeactor.create.middleware");
const {getAllTypeActors, addTypeActor } = require("../controllers");

const typeActorRoads = express.Router();

typeActorRoads.get("/all", getAllTypeActors);
typeActorRoads.post("/add",typeActorRegisteMiddleware, addTypeActor);

module.exports = { typeActorRoads };
