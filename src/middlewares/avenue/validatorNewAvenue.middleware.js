const express = require("express");
const { body, validationResult } = require("express-validator");

const validatedAvenue = express();
const validationNewAvenue = [
  body("name_avenue")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long")
    .matches(/[A-Za-z_-]{2,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  body("quarterId")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars")
    .matches(/\w{1,}/)
    .withMessage("contain not the chars")
    .trim()
    .escape(),
];

validatedAvenue.use(validationNewAvenue, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedAvenue };
