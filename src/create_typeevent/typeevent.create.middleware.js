/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const typeEventRegisteMiddleware = express();

const validationMiddlewares = [
  body("nametype_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("description")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
];

typeEventRegisteMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nametype_event,description } = req.body;

  res.nametype_event = nametype_event;
  res.description = description;
  next();
});

module.exports = typeEventRegisteMiddleware;
