const express = require("express");
const { param, validationResult } = require("express-validator");

const getStaffMiddleware = express();

getStaffMiddleware.use(
  [
    param("id_staff").isEmpty().withMessage("paramètre manquant")
    .trim()
    .escape(),
  ],
  (req, res, next) => {
    const { id_staff } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.id_staff = id_staff;
    next();
  }
);

module.exports = getStaffMiddleware;
