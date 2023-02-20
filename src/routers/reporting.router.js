const express = require("express");
const {
  certificateCountByMounth, reportingAnnual
} = require("../controllers/reporting.controllers");

const reportingRouter = express.Router();

reportingRouter.get("/reportingCertificate", certificateCountByMounth);
reportingRouter.get("/reportingAnnual", reportingAnnual);

module.exports = reportingRouter;