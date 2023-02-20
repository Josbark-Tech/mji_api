const express = require("express");
const {
  validatedQuarter,
} = require("../middlewares/quarter/validatorNewQuarter.middleware");
const {
  getAllQuarter,
  addQuarter,
  getOneQuarter,
  updateQuarter,
  getQuarterAndAvenue,
  getQuarterByProvince
} = require("../controllers/quarters.controllers");
const { validatedGetOneQuarter } = require("../middlewares/quarter/validatorGetQuarter.middleware");
const quarterRouter = express.Router();

quarterRouter.get("/",validatedGetOneQuarter,getOneQuarter)
quarterRouter.get("/All", getAllQuarter);
quarterRouter.post("/", validatedQuarter, addQuarter);
quarterRouter.put("/",validatedGetOneQuarter,validatedQuarter,updateQuarter);
quarterRouter.get("/details",validatedGetOneQuarter,getQuarterAndAvenue);
quarterRouter.get("/byProvince",getQuarterByProvince);

module.exports = quarterRouter;
