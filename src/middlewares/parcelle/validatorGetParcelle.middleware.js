const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneParcelle = express();
const validationParcelle = [
  check("id_parcelle")
    .isLength({ min: 20 })
    .withMessage("must be at least 20 chars")
    // .matches(/(\[A-Za-z0-9]{4,}){3,}/)
    // .withMessage("contain the number"),
];

validatedGetOneParcelle.use(validationParcelle, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneParcelle };
