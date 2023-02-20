const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneProvince = express();
const validationProvince = [
  check("id_province")
    .isLength({ min: 1 })
    .withMessage("must be at least 20 chars")
    .matches(/^\d{1,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
];

validatedGetOneProvince.use(validationProvince, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneProvince };
