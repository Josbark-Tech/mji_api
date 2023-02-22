const express = require("express");
const { check, validationResult, param } = require("express-validator");

const validatedOneId = express();
const validationId = [
  param("id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars")
    .matches(/^\d{1,}/)
    .withMessage("contain the number")
    .trim()
    .escape(),
];

validatedOneId.use(validationId, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
});

module.exports = { validatedOneId };
