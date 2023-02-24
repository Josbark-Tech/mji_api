/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const participateInEventMiddleware = express();

const validationMiddlewares = [
  body("event_id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .isNumeric()
    .withMessage("It is not a number")
    .trim()
    .escape(),
  body("participate_in")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("The type pass is not boolean")
    .trim()
    .escape(),
];

participateInEventMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
});

module.exports = participateInEventMiddleware;
