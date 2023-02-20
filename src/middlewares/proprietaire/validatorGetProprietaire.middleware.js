const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneProprietaire = express();
const validationProprietaire = [
  check("id_proprietaire")
    .isLength({ min: 20 })
    .withMessage("must be at least 20 chars")
    // .matches(/(\[A-Za-z0-9]{4,}){3,}/)
    // .withMessage("contain the number"),
];

validatedGetOneProprietaire.use(validationProprietaire, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneProprietaire };
