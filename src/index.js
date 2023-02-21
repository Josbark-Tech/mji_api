const express = require("express");
const cors = require("cors");
const { typeUserRoads, typeEventRoads, userRoads, countryRoads, typeActorRoads } = require("./roads");
const { default: helmet } = require("helmet");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json({ limit: "3Mb" }));
app.use(express.urlencoded({ limit: "3Mb", extended: false }));

// require("../src/auth/passport");

app.get("/", async (req, res) => {
  res.send("Welcome to event server");
});

app.use("/typeuser", typeUserRoads);
app.use("/typeevent", typeEventRoads);
app.use("/typeactor", typeActorRoads);
app.use("/user", userRoads);
app.use("/country", countryRoads);

module.exports = app;
