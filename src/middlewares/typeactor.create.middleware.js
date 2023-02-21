/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const typeActorRegisteMiddleware = express();

const validationMiddlewares = [
  body("type_actor")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
];

typeActorRegisteMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { type_actor } = req.body;

  res.type_actor = type_actor;
  next();
});

module.exports = typeActorRegisteMiddleware;
