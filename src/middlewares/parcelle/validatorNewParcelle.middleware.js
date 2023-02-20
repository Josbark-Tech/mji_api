const express = require("express");
const { body, check, validationResult } = require("express-validator");

const validatedParcelle = express();
const validationNewParcelle = [
  check("avenueId")
    .notEmpty()
    .withMessage("Avenue Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .matches(/\d{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("number_parcel")
    .isLength({ min: 1 })
    .withMessage("must be at least 2 chars")
    .matches(/\w{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("cadastral_number")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars")
    .trim()
    .escape(),
  check("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth cannot be empty")
    .isDate()
    .withMessage("Date of birth is not valid")
    .trim()
    .escape(),
  check("description")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars")
    .trim()
    .escape(),
  check("firstname_owner")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/[A-Za-z_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("name_conservative")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/^[A-Za-z_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("name_owner")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/[A-Za-z_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("nationality")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/[A-Za-z_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("postname_owner")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/[A-Za-z_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("dead_of_sale")
    .notEmpty()
    .withMessage("Cannot be empty"),
  check("lodgers_book")
    .notEmpty()
    .withMessage("Cannot be empty"),
  check("pv_measurement_demarcation")
    .notEmpty()
    .withMessage("Cannot be empty"),
  /*check("situation")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/[A-Za-z0-9_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),*/
  check("folio")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 2 chars long")
    .matches(/^[A-Za-z0-9_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("volume")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 1 chars long")
    .matches(/^[A-Za-z0-9_-]{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
  check("surface")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .matches(/\d{1,}$/)
    .withMessage("contain the number")
    .trim()
    .escape(),
];

validatedParcelle.use(validationNewParcelle, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedParcelle };
