/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const typeUserRegisteMiddleware = express();

const validationMiddlewares = [
  body("type_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
];

typeUserRegisteMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { type_user } = req.body;

  res.type_user = type_user;
  next();
});

module.exports = typeUserRegisteMiddleware;
