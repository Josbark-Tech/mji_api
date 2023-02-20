const express = require("express");
const cors = require("cors");
// const avenueRouter = require("./routers/avenues.route");
// const townshipRouter = require("./routers/townships.route");
// const districtRouter = require("./routers/districs.router");
// const parcelleRouter = require("./routers/parcelles.router");
// const proprietaireRouter = require("./routers/proprietaires.router");
// const provinceRouter = require("./routers/provinces.router");
// const quarterRouter = require("./routers/quarters.route");
// const staffRouter = require("./routers/staffs.router");
// const reportingRouter = require("./routers/reporting.router");

// const { authRouter } = require("./routers/login.router");
// const passport = require("passport");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", /.{5,6}\/\/lopango-info-.{8,}/,/.{5,6}\/\/dashboard-chef-oeuvre.{8,}/],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};
const corsOptions1 = {
  origin: false,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "3Mb" }));
app.use(express.urlencoded({ limit: "3Mb", extended: false }));

// require("../src/auth/passport");

app.get("/", async (req, res) => {
  res.send("Welcome to the Lopango Infos");
});

// app.use("/api_lopango/auth", authRouter);
// app.use(
//   "/api_lopango/provinces",
//   passport.authenticate("jwt", { session: false }),
//   provinceRouter
// );
// app.use(
//   "/api_lopango/districts",
//   passport.authenticate("jwt", { session: false }),
//   districtRouter
// );
// app.use(
//   "/api_lopango/townships",
//   passport.authenticate("jwt", { session: false }),
//   townshipRouter
// );
// app.use(
//   "/api_lopango/quarters",
//   passport.authenticate("jwt", { session: false }),
//   quarterRouter
// );
// app.use(
// "/api_lopango/avenues",
//   passport.authenticate("jwt", { session: false }),
//   avenueRouter
// );
// app.use(
//   "/api_lopango/parcels",
//   passport.authenticate("jwt", { session: false }),
//   parcelleRouter
// );
// app.use(
//   "/api_lopango/owners",
//   passport.authenticate("jwt", { session: false }),
//   proprietaireRouter
// );
// app.use(
//   "/api_lopango/staffs",
//   passport.authenticate("jwt", { session: false }),
//   staffRouter
// );
// app.use(
//   "/api_lopango/reporting",
//   passport.authenticate("jwt", { session: false }),
//   reportingRouter
// );

app.post("/typeuser/add", async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "User added" });
  
})

module.exports = app;
