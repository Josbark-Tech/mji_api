const express = require("express");
const { body, validationResult } = require("express-validator");

const loginMiddleware = express();

loginMiddleware.use(
  [
    body("username")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long")
      .trim()
      .escape(),
    body("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 4 })
      .withMessage("Short password")
      .trim()
      .escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }   

    res.password = req.body.password;
    res.login = req.body.username;
    
    next();
  }
);

module.exports = loginMiddleware;
