const express = require("express");
const {
  validatedTownship,
} = require("../middlewares/township/validatorNewTownship.middleware");
const {
  getAllTownship,
  addTownship,
  getOneTownship,
  updateTownship,
  getTownshipAndQuarter,
  getTownshipByProvince,
} = require("../controllers/townships.controllers");
const {
  validatedGetOneCommune,
} = require("../middlewares/township/validatorGetTownship.middleware");
const townshipRouter = express.Router();

townshipRouter.get("/", validatedGetOneCommune, getOneTownship);
townshipRouter.get("/All", getAllTownship);
townshipRouter.post("/", validatedTownship, addTownship);
townshipRouter.put("/", validatedGetOneCommune, validatedTownship, updateTownship);
townshipRouter.get("/details", validatedGetOneCommune, getTownshipAndQuarter);
townshipRouter.get("/TownshipByProvince", getTownshipByProvince)

module.exports = townshipRouter;
