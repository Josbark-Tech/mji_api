const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const userRegisteMiddleware = express();

const validationMiddlewares = [
  body("email")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isEmail()
    .trim()
    .escape(),
  body("name_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("lastname_user")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 2 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("firstname")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("phone_number")
    .isLength({ min: 8 })
    .withMessage("must be at least 8 chars long")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 4 })
    .withMessage("must be at least 4 chars long"),
  body("sexe").notEmpty().withMessage("Cannot be empty").trim().escape(),
];

userRegisteMiddleware.use(validationMiddlewares, 
  async (req, res, next) => {
  if (req.body.password) {
    await body('password_confirmation')
      .equals(req.body.password)
      .withMessage('passwords do not match')
      .run(req);
  }
  next();}, 
  (req, res, next) => {
    let {
      name_user,
      lastname_user,
      firstname,
      sexe,
      email,
      phone_number,
      password,
    } = req.body;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.password = bcrypt.hashSync(password, 10);
  res.email = email;
  res.name_user = name_user;
  res.lastname_user = lastname_user;
  res.firstname = firstname;
  res.phone_number = phone_number;
  res.sexe = sexe;
  res.typeuser_id = 2;
  next();
});

module.exports = userRegisteMiddleware;
