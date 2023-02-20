const express = require("express");
const typeUserRegisteMiddleware = require("../create_typeuser/typeuser.create.middleware");
const addTypeUser = require("../create_typeuser/typeuser.create.controller");

const typeUserRoad = express.Router();

typeUserRoad.post("/add",typeUserRegisteMiddleware, addTypeUser);

module.exports = { typeUserRoad };
