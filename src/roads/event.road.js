const express = require("express");
const { getAllUsers, addUser } = require("../controllers");
const  userRegisteMiddleware  = require("../middlewares/user.create.middleware");

const eventRoads = express.Router();

eventRoads.get("/all", getAllUsers);
eventRoads.post("/add", userRegisteMiddleware, addUser);

module.exports = { eventRoads };