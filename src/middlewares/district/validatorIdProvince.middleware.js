const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedIdProvince = express();
const validationProvince = [
  check("provinceId")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars")
    .matches(/^\d{1,}$/)
    .withMessage("contain the chars not valid")
    .trim()
    .escape(),
  ,
];

validatedIdProvince.use(validationProvince, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedIdProvince };
