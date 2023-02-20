const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { staff }= require("../models");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    function (jwtPayload, done) {
       staff.findOne({ where: { id: jwtPayload.id } })
        .then((staff) => {
          return done(null, staff);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
