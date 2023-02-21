const { Country, sequelize } = require("../models");

const addCountry = async (req, res) => {
  const result = await sequelize.transaction(async (t) => {
    try {
      const { country_name } = res;
      const countryFind = await Country.findOne({
        where: { country_name },
      });
      if (countryFind) {
        return res.status(400).json({
          message: "Country already exists",
        });
      } else {
        const countryCreated = await Country.create(res);
        if (countryCreated) {
          return res.status(200).json({
            message: `Country ${countryCreated.country_name} created`,
          });
        } else {
          return res.status(400).json({
            message: "Error creating country, please try again",
          });
        }
      }
    } catch (error) {
      return res
        .status(400)
        .json({ erreur: "La requête échouée ", message: `${error} ${t}` });
    }
  });
};

const getAllCountries = async (req, res) => {
  try {
    res.status(200).send(
      await Country.findAll({
        attributes: {
          exclude: ["deletedAt", "createdAt", "updatedAt"],
          order: ["id", "DESC"],
        },
      })
    );  
  } catch (error) {
    res.status(500).json({ erreur: "La requête a échouée, Veuillez tenter dans un instant" });
  }
};


module.exports = {
  addCountry,
  getAllCountries,
};
