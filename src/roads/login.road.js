const express = require("express");
const { login } = require("../controllers/login.controllers");
const loginMiddleware = require("../middlewares/login.middleware");

const authRoads = express.Router();

authRoads.post("/", loginMiddleware, login);

module.exports = { authRoads };
