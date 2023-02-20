const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneCommune = express();
const validationCommune = [
  check("id_township")
    .isLength({ min: 20 })
    .withMessage("must be at least 20 chars")
    // .matches(/(\[A-Za-z0-9]{4,}){3,}/)
    // .withMessage("contain the number"),
];

validatedGetOneCommune.use(validationCommune, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneCommune };
