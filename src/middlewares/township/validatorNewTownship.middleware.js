const express = require("express");
const { body, check, validationResult } = require("express-validator");

const validatedTownship = express();
const validationNewTownship = [
  body("name_township")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 5 chars long")
    .matches(/^[A-Za-z_-]{5,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("surface_township")
    .isLength({ min: 2 })
    .withMessage("must be at least 3 chars")
    .matches(/^\d{3,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("history_township")
    .isLength({ min: 10 })
    .withMessage("must be at least 10 chars")
    .matches(/^[A-Za-z]{2,}/)
    .withMessage("contain the chars not valid")
    .trim()
    .escape(),
  check("districtId")
    .notEmpty()
    .withMessage("cannot be empty")
    .matches(/^\d{1,}$/)
    .withMessage("contain the chars not valid")
    .trim()
    .escape(),
  check("image_township")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 10 })
    .withMessage("must be at least 10 chars"),
];

validatedTownship.use(validationNewTownship, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedTownship };
