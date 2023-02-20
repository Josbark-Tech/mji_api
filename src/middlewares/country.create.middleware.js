/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult } = require("express-validator");

const countryRegisteMiddleware = express();

const validationMiddlewares = [
  body("country_name")
  .notEmpty()
  .withMessage("Cannot be empty")
  .isLength({ min: 3 })
  .withMessage("must be at least 3 chars long")
  .trim()
  .escape(),
  body("zip_code")
  .isLength({ min: 2 })
  .withMessage("must be at least 2 chars long")
  .trim()
  .escape(),
];

countryRegisteMiddleware.use(validationMiddlewares, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { country_name } = req.body;

  res.country_name = country_name;
  next();
});

module.exports = countryRegisteMiddleware;
