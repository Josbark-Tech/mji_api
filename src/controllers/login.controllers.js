const { staff, sequelize } = require("../models");
const { Op } = require("sequelize");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginFunction = async (password, login, req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {

      const staffWithEmail = await staff.findOne({
        where:{ [Op.or] :[{email: login }, { username: login }] },
      });
      if (!staffWithEmail) {
        return res.status(400).json({ message: "This staff not found" });
      }
      const isPasswordValid = await compare(password, staffWithEmail.password);
      
      if (!staffWithEmail && !isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Email and password does not valid" });
      } else if (staffWithEmail && !isPasswordValid) {
        return res.status(400).json({ message: "Password not valid" });
      } else if (!staffWithEmail && isPasswordValid) {
        return res.status(400).json({ message: "Email not valid" });
      } else {
        const jwtToken = jwt.sign(
          { id: staffWithEmail.id, email: staffWithEmail.email },
          process.env.JWT_SECRET, 
          {expiresIn:"24h"}
        );
        res.status(200).json({
          message: "Welcome to LOPANGO INFOS",
          token: jwtToken,
          name: `${staffWithEmail.firstname_staff} ${staffWithEmail.name_staff}`,
          isAdmin: ` ${staffWithEmail.is_admin}`,
          id : `${staffWithEmail.id}`,
          id_staff: `${staffWithEmail.id_staff}`,
          status: `${staffWithEmail.statut}`,
        });
      }
    });
  } catch (error) {
    
    return res
    .status(400)
    .send({ message : `${error}`});
  }
};

module.exports = {
  login: async (req, res) => {
    const { password, login } = res;
    loginFunction( password, login ,req, res);
  },
};
