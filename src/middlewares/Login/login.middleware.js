const express = require("express");
const { body, validationResult } = require("express-validator");

const loginMiddleware = express();

loginMiddleware.use(
  [
    // body("email").isEmail().withMessage("c'est pas une adresse mail valide").trim().escape(),
    body("username")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long")
      .trim()
      .escape(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Short password")
      .trim()
      .escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const expressRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    const isEmail = expressRegex.test(req.body.username);
   
    /*
    if(isEmail){
        var email = req.body.username;
        res.email = email;
    }else{
        var username = req.body.username;
        res.username = username;
    }
    */
    res.password = req.body.password;
    res.login = req.body.username;
    
    next();
  }
);

module.exports = loginMiddleware;
