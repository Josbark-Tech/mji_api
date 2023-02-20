const express = require("express");
const { param, check, validationResult } = require("express-validator");

const validatedGetOneDistrict = express();
const validationDistrict = [
  check("id_district")
    .isLength({ min: 20 })
    .withMessage("must be at least 20 chars")
    // .matches(/(\[A-Za-z0-9]{4,}){3,}/)
    // .withMessage("contain the number"),
];

validatedGetOneDistrict.use(validationDistrict, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedGetOneDistrict };
