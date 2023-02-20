const express = require("express");
const { body, check, validationResult } = require("express-validator");

const validatedProvince = express();
const validationNewProvince = [
  body("name_province")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars long")
    .matches(/^[A-Za-z_-]{4,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("surface_province")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars")
    .matches(/^\d{2,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("history_province")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 5 })
    .withMessage("must be at least 10 chars")
    .trim()
    .escape(),
  // .matches(/^[A-Za-z_]{10,}/)
  // .withMessage("contain the chars not valid"),
  check("image_province")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 10 })
    .withMessage("must be at least 10 chars"),
  // .matches(/^[A-Za-z]{2,}/)
  // .withMessage("contain the chars not valid"),
  check("chieftown")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars")
    .matches(/^[A-Za-z]{2,}/)
    .withMessage("contain the chars not valid")
    .trim()
    .escape(),
];

validatedProvince.use(validationNewProvince, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedProvince };
