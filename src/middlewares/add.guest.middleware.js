/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const guestsMiddleware = express();

const validationMiddlewares = [
  body("name_guest")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long")
    .trim()
    .escape(),
  body("event_id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .isNumeric()
    .withMessage("It is not a number")
    .trim()
    .escape(),
  body("phone_number")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long")
    // .isMobilePhone()
    // .withMessage("This is not a mobile number")
    .trim()
    .escape(),
  body("description")
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
