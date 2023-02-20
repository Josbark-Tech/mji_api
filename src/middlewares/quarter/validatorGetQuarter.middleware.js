const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneQuarter = express();
const validationQuarter = [
  check("id_quarter")
  .isLength({ min: 1 })
  .withMessage("L'identifiant du quartier doit être renseigné")
  .matches(/^\d{1,}/)
  .withMessage("L'identifiant du quartier doit être un nombre")
  .trim()
  .escape(),
];

validatedGetOneQuarter.use(validationQuarter, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneQuarter };
