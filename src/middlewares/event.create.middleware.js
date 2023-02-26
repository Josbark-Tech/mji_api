/* eslint-disable no-undef */
const express = require("express");
const { body, validationResult, check } = require("express-validator");

const eventCreatedMiddleware = express();

const validationMiddleware = [
  body("name_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("path_picture_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("number_place")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isNumeric()
    .withMessage("It is not a number")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("is_private")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isBoolean()
    .withMessage("The type pass is not supported")
    .trim()
    .escape(),
  body("tab_date_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("tab_time_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("address_event")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 chars long")
    .trim()
    .escape(),
  body("country_id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .trim()
    .escape(),
  body("typeevent_id")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .trim()
    .escape(),
  check("number_ticket")
    .isNumeric()
    .withMessage("It is not a number")
    .isLength({ min: 1 })
    .withMessage("must be at least 1 chars long")
    .trim()
    .escape(),
  body("tab_name_ticket")
    // .isJSON()
    // .withMessage("It is not a JSON")
    // .isLength({ min: 2 })
    // .withMessage("must be at least 2 chars long")
    .trim()
    .escape(),
//   body("tab_name_category")
//     // .isJSON()
//     // .withMessage("It is not a JSON")
//     .isLength({ min: 2 })
//     .withMessage("must be at least 2 chars long")
//     .trim()
//     .escape(),
//   body("tab_price_ticket")
//     // .isJSON()
//     // .withMessage("It is not a JSON")
//     .isLength({ min: 2 })
//     .withMessage("must be at least 2 chars long")
//     .trim()
//     .escape(),
//   body("tab_invite")
//     .isJSON()
//     .withMessage("It is not a JSON")
//     .isLength({ min: 2 })
//     .withMessage("must be at least 2 chars long")
//     .trim()
//     .escape(),
];

eventCreatedMiddleware.use(validationMiddleware, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

module.exports = eventCreatedMiddleware;
