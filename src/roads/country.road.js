const express = require("express");
const countryRegisteMiddleware = require("../middlewares/country.create.middleware");
const { getAllCountries, addCountry } = require("../controllers");

const countryRoads = express.Router();

countryRoads.get("/all", getAllCountries);
countryRoads.post("/add", countryRegisteMiddleware, addCountry);

module.exports = { countryRoads };
