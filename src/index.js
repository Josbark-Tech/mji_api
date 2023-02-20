const express = require("express");
const cors = require("cors");
const { typeUserRoads } = require("./roads/typeuser.road");
const { typeEventRoads } = require("./roads/typeevent.road");
const { userRoads } = require("./roads/user.road");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", /.{5,6}\/\/lopango-info-.{8,}/,/.{5,6}\/\/dashboard-chef-oeuvre.{8,}/],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "3Mb" }));
app.use(express.urlencoded({ limit: "3Mb", extended: false }));

// require("../src/auth/passport");

app.get("/", async (req, res) => {
  res.send("Welcome to event server");
});

app.use("/typeuser", typeUserRoads);
app.use("/typeevent", typeEventRoads);
app.use("/user", userRoads);

module.exports = app;
