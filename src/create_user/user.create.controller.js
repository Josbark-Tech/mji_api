const { User, sequelize } = require("../models");

const addUser = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { email } = res;
      const userFind = await User.findOne({
        where: { email: email },
      });
      if (userFind) {
        return res.status(400).json({
          message: "User already exists",
        });
      } else {
        const userCreated = await User.create(res);
        if (userCreated) {
          return res.status(200).json({
            message: `User ${userCreated.name_user} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating user, please try again",
          });
        }
      }
    } catch (error) {}
  });
};
module.exports = addUser;
