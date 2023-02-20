const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const randomstring = require("randomstring");

const staffUpdateMiddleware = express();

const validationMiddlewares = [
  body("email")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isEmail()
    .trim()
    .escape(),
  body("name_staff")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("firstname_staff")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("postname_staff")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("sexe").notEmpty().withMessage("Cannot be empty").trim().escape(),
  body("status")
    .notEmpty()
    .withMessage("Cannot be empty")
    .matches(/\w/)
    .withMessage("pas de chiffres")
    .trim()
    .escape(),
  body("is_admin")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("Is not Boolean value"),
];

staffUpdateMiddleware.use(validationMiddlewares, (req, res, next) => {
  const {
    name_staff,
    postname_staff,
    firstname_staff,
    sexe,
    email,
    is_admin,
    status,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const password_brut = randomstring.generate({
  //   length: 8,
  //   charset: 'alphabetic'
  // });;

  res.email = email;
  res.name_staff = name_staff;
  res.postname_staff = postname_staff;
  res.firstname_staff = firstname_staff;
  res.is_admin = is_admin;
  res.sexe = sexe;
  res.status = status;
  res.id_staff = res.id_staff;
  next();
});

module.exports = staffUpdateMiddleware;
