const express = require("express");
const { getAllUsers, addUser } = require("../controllers");
const  userRegisteMiddleware  = require("../middlewares/user.create.middleware");

const userRoads = express.Router();

userRoads.get("/all", getAllUsers);
userRoads.post("/add", userRegisteMiddleware, addUser);

module.exports = { userRoads };