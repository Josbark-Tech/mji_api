const express = require("express");
const { body, check, validationResult } = require("express-validator");

const validatedDistrict = express();
const validationNewDistrict = [
  body("name_district")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .matches(/^[A-Za-z_-]{3,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("surface_district")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars")
    .matches(/^\d{2,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("provinceId")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars")
    .matches(/^\d{1,}$/)
    .withMessage("contain the chars not valid")
    .trim()
    .escape(),
];

validatedDistrict.use(validationNewDistrict, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedDistrict };
