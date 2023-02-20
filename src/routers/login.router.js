const express = require("express");
const { login } = require("../controllers/login.controllers");
const loginMiddleware = require("../middlewares/Login/login.middleware");

const authRouter = express.Router();

authRouter.post("/", loginMiddleware, login);

module.exports = { authRouter };
