const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneAvenue = express();
const validationAvenue = [
  check("id_avenue")
    .isLength({ min: 20 })
    .withMessage("must be at least 20 chars")
    // .matches(/(\[A-Za-z0-9]{4,}){3,}/)
    // .withMessage("contain the number"),
];

validatedGetOneAvenue.use(validationAvenue, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneAvenue };
