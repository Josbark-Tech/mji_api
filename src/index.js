const express = require("express");
const cors = require("cors");
const { typeUserRoad } = require("./roads/typeuser.road");

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

app.use("/typeuser", typeUserRoad)

module.exports = app;
