const express = require("express");
const typeUserRegisteMiddleware = require("../create_typeuser/typeuser.create.middleware");
const addTypeUser = require("../create_typeuser/typeuser.create.controller");

const typeUserRoads = express.Router();

typeUserRoads.post("/add",typeUserRegisteMiddleware, addTypeUser);

module.exports = { typeUserRoads };
