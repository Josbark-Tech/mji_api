const express = require("express");
const { validatedAvenue } = require("../middlewares/avenue/validatorNewAvenue.middleware");
const { getOneAvenue, getAllAvenue, addAvenue, updateAvenue, getAvenueAndAllParcel, getAvenueByQuarter } = require("../controllers/avenues.controllers");
const { validatedGetOneAvenue } = require("../middlewares/avenue/validatorGetAvenue.middleware");
const avenueRouter = express.Router();

avenueRouter.get("/",validatedGetOneAvenue,getOneAvenue)
avenueRouter.get("/All", getAllAvenue);
avenueRouter.get("/ByQuarter", getAvenueByQuarter);
avenueRouter.post("/", validatedAvenue, addAvenue);
avenueRouter.put("/",validatedGetOneAvenue,validatedAvenue,updateAvenue);
avenueRouter.get("/Statistique", validatedGetOneAvenue, getAvenueAndAllParcel)

module.exports = avenueRouter;
