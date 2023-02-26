/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const guestsMiddleware = express();

const validationMiddlewares = [
  body("list_guest")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .isArray()
    .withMessage("this data is not a array")
    .trim(),
    // .escape(),
  body("event_id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .isNumeric()
    .withMessage("It is not a number")
    .trim()
    .escape(),
];

guestsMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
});

module.exports = guestsMiddleware;
