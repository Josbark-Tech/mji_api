const express = require("express");
const {
  getAllStaff,
  addStaff,
  updateStaff,
  getOneStaff,
  deleteStaff,
} = require("../controllers/staff.controllers");
const staffRegisterMiddleware = require("../middlewares/staff/staff.register.validation.middleware");
const getStaffMiddleware = require("../middlewares/staff/staff.get.middleware");
const staffUpdateMiddleware = require("../middlewares/staff/staff.update.validation.middleware");

const staffRouter = express.Router();

staffRouter.get("/", getStaffMiddleware, getOneStaff);
staffRouter.get("/All", getAllStaff);
staffRouter.post("/", staffRegisterMiddleware, addStaff);
staffRouter.put("/", getStaffMiddleware, staffUpdateMiddleware, updateStaff);
staffRouter.delete("/", getStaffMiddleware, deleteStaff);

module.exports = staffRouter;