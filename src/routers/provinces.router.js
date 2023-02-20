const express = require("express");
const multer  = require('multer')
const upload = multer();

const { validatedProvince } = require("../middlewares/province/validatorNewProvince.middleware");
const {
  getAllProvince,
  addProvince,
  getOneProvince,
  updateProvince,
  getProvinceAndDistrict,
} = require("../controllers/provinces.controllers");
const { validatedGetOneProvince } = require("../middlewares/province/validatorGetProvince.middleware");
const provinceRouter = express.Router();

provinceRouter.get("/",validatedGetOneProvince, getOneProvince)
provinceRouter.get("/All", getAllProvince);
provinceRouter.post("/", validatedProvince, addProvince);
provinceRouter.put("/",validatedGetOneProvince,validatedProvince,updateProvince);
provinceRouter.get("/details", validatedGetOneProvince, getProvinceAndDistrict);


module.exports = provinceRouter;
