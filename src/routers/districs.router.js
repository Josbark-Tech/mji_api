const express = require("express");
const { validatedDistrict } = require("../middlewares/district/validatorNewDistrict.middleware");
const {
  getAllDistrict,
  addDistrict,
  getOneDistrict,
  updateDistrict,
  getDistrictAndTownship,
  getDistrictByProvince,
} = require("../controllers/districts.controllers");
const { validatedGetOneDistrict } = require("../middlewares/district/validatorGetDistrict.middleware");
// const { validatedIdProvince } = require("../middlewares/district/validatorIdProvince.middleware");
const districtRouter = express.Router();

districtRouter.get("/",validatedGetOneDistrict, getOneDistrict)
districtRouter.get("/All", getAllDistrict);
districtRouter.post("/", validatedDistrict, addDistrict);
districtRouter.put("/",validatedGetOneDistrict,validatedDistrict,updateDistrict);
districtRouter.get("/details",validatedGetOneDistrict, getDistrictAndTownship)
districtRouter.get("/ByProvince", getDistrictByProvince)

module.exports = districtRouter;
