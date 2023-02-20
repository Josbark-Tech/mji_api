const {
  avenue,
  parcel,
  quarter,
  township,
  district,
  sequelize,
} = require("../models");
const { QueryTypes } = require("sequelize");

const getOneAvenue = async (req, res) => {
  const { id_avenue } = req.query;
  res.send(
    await avenue.findOne({
      where: {
        id_avenue,
      },
      attributes: ["id_avenue", "name_avenue", "quarterId"],
    })
  );
};

const getAllAvenue = async (req, res) => {
  const allAvenue = await sequelize.query(
    "SELECT Av.id, Av.id_avenue, Av.name_avenue, Q.name_quarter, T.name_township,P.name_province FROM `avenues` Av INNER JOIN `quarters` Q ON Q.id = Av.quarterId INNER JOIN `townships` T ON T.id = Q.townshipId INNER JOIN `districts` D ON D.id = T.districtId INNER JOIN `provinces` P ON P.id = D.provinceId",
    {
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).send(allAvenue);
};

const addAvenue = async (req, res) => {
  const { name_avenue, quarterId } = req.body;
  const quarterFound = await quarter.findOne({
    where: {
      id: quarterId,
    },
  });
  if (quarterFound) {
    const newAvenue = await avenue.create({
      name_avenue,
      quarterId,
    });
    res
      .status(200)
      .send(`L'avenue ${newAvenue.name_avenue} ajoutée avec succès`);
  } else {
    res.status(400).send(`Ce quartier n'existe pas`);
  }
};

const updateAvenue = async (req, res) => {
  const { id_avenue } = req.query;
  const { name_avenue, quarterId } = req.body;

  const quarterFound = await quarter.findOne({
    where: {
      id_quarter: quarterId,
    },
  });
  if (quarterFound) {
    const savedQuartier = await avenue.update(
      {
        name_avenue,
        quarterId,
      },
      {
        where: {
          id_avenue,
        },
      }
    );
    if (savedQuartier === true) {
      res.status(200).json({ message: "update successfully completed" });
    } else {
      res.send({ message: "update completed fails" });
    }
  } else {
    res.status(400).send(`Ce quartier n'existe pas`);
  }
};
const getAvenueAndAllParcel = async (req, res) => {
  const { id_avenue } = req.query;
  const allParcelInAvenue = await avenue.findOne({
    where: {
      id_avenue,
    },
    attributes: ["name_avenue", "quarterId"],
    include: {
      model: parcel,
      attributes: [
        "id_parcel",
        "number_parcel",
        [sequelize.fn("COUNT", sequelize.col("id_parcel")), "number_parcel"],
      ],
    },
  });
  res.status(200).send(allParcelInAvenue);
};
const getAvenueByQuarter = async (req, res) => {
  const { id_quarter } = req.query;
  const allAvenueInQuarter = await sequelize.query(
    "SELECT Av.id, Av.id_avenue, Av.name_avenue, Q.name_quarter, T.name_township, (SELECT COUNT(P.id) FROM `parcels` P WHERE P.avenueId = Av.id) as number_parcel  FROM `avenues` Av INNER JOIN `quarters` Q ON Q.id = Av.quarterId INNER JOIN `townships` T ON T.id = Q.townshipId  WHERE Av.quarterId = :id_quarter",
    {
      replacements: { id_quarter },
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).send(allAvenueInQuarter);
};

module.exports = {
  getAllAvenue,
  addAvenue,
  getOneAvenue,
  updateAvenue,
  getAvenueAndAllParcel,
  getAvenueByQuarter,
};
