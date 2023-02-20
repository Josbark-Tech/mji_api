const express = require("express");
const { body, check, validationResult } = require("express-validator");

const validatedProprietaire = express();
const validationNewProprietaire = [
  body("nom_proprietaire")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/^[A-Za-z_-]{5,}$/)
    .withMessage("contain the number"),
  body("postnom_proprietaire")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/^[A-Za-z_-]{5,}$/)
    .withMessage("contain the number"),
  check("prenom_proprietaire")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/^[A-Za-z_-]{5,}$/)
    .withMessage("contain the number"),
  check("date_naissance")
    .notEmpty()
    .withMessage("cannot be empty")
    .isDate()
    .withMessage("must be at a date"),
  check("nationalite")
    .notEmpty()
    .withMessage("cannot be empty")
    .isLength({ min: 5 })
    .withMessage("must be at least 10 chars")
    .matches(/^[A-Za-z]{2,}/)
    .withMessage("contain the chars not valid"),
  check("personnelId")
    .notEmpty()
    .withMessage("cannot be empty")
    .matches(/^\d{1,}$/)
    .withMessage("contain the chars not valid"),
];

validatedProprietaire.use(validationNewProprietaire, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedProprietaire };
