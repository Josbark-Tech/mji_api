const { User, sequelize } = require("../models");
const { Op } = require("sequelize");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const {password, login} = res;

      const userFind = await User.findOne({
        where:{ [Op.or] :[{email: login }, { firstname: login }, { lastname_user: login }, { name_user: login }] },
      });
      if (!userFind) {
        return res.status(400).json({ message: "This User not found" });
      }
      const isPasswordValid = await compare(password, userFind.password);
      
      if (!userFind && !isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Email and password does not valid" });
      } else if (userFind && !isPasswordValid) {
        return res.status(400).json({ message: "Password not valid" });
      } else if (!userFind && isPasswordValid) {
        return res.status(400).json({ message: "Email not valid" });
      } else {
        const jwtToken = jwt.sign(
          { id: userFind.id, email: userFind.email },
          process.env.JWT_SECRET, 
          // {expiresIn:"24h"}
        );
        res.status(200).json({
          message: "Welcomento MJI Event",
          token: jwtToken,
          name: userFind.name_user,
          lastname_user : userFind.lastname_user,
          firstname : userFind.firstname,
          id : userFind.id,
          sexe: userFind.sexe,
          phone_number: userFind.phone_number,
          email: userFind.email,
          typeuser_id: userFind.typeuser_id,
        });
      }
    });
  } catch (error) {
    
    return res
    .status(400)
    .send({ message : `${error}`});
  }
};

module.exports = {login};
