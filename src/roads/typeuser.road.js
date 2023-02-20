const express = require("express");
const typeUserRegisteMiddleware = require("../middlewares/typeuser.create.middleware");
const { addTypeUser, getAllTypeUsers } = require("../controllers");

const typeUserRoads = express.Router();

typeUserRoads.get("/all", getAllTypeUsers);
typeUserRoads.post("/add",typeUserRegisteMiddleware, addTypeUser);

module.exports = { typeUserRoads };
