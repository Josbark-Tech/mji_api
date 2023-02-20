const { district, province, township, sequelize } = require("../models");

const getOneDistrict = async (req, res) => {
  const { id_district } = req.query;
  res.status(200).send(
    await district.findOne({
      where: {
        id_district,
      },
      attributes: [
        "id_district",
        "name_district",
        "surface_district",
        "provinceId",
      ],
    })
  );
};

const getAllDistrict = async (req, res) => {
  res.status(200).send(
    await district.findAll({
      attributes: [
        "id",
        // "id_district",
        "name_district",
        "surface_district",
        "provinceId",
      ],
    })
  );
};

const getDistrictByProvince = async (req, res) => {
  const { provinceId } = req.query;
  res.status(200).send(
    await district.findAll({
      where: {
        provinceId,
      },
      attributes: ["id", "name_district", "surface_district", "provinceId"],
    })
  );
};

const addDistrict = async (req, res) => {
  const { name_district, surface_district, provinceId } = req.body;
  const provinceFind = await province.findOne({
    where: {
      id: provinceId,
    },
  });
  if (provinceFind) {
    const newDistrict = await district.create({
      name_district,
      surface_district,
      provinceId: provinceFind.id,
    });
    res
      .status(200)
      .send(
        `Le district de ${newDistrict.name_district} vient d'être ajouter avec succès`
      );
  } else {
    res.send({ message: "La province non trouvée" });
  }
};

const updateDistrict = async (req, res) => {
  const { id_district } = req.query;
  const { name_district, surface_district, provinceId } = req.body;
  const savedDistrict = await district.update(
    {
      name_district,
      surface_district,
      provinceId,
    },
    {
      where: {
        id_district,
      },
    }
  );
  if (savedDistrict) {
    res
      .status(200)
      .json({ message: `${name_district} update successfully completed` });
  } else {
    res.send({ message: "update completed fails" });
  }
};
const getDistrictAndTownship = async (req, res) => {
  const { id_district } = req.query;
  res.status(200).send(
    await district.findOne({
      where: {
        id_district,
      },
      include: {
        model: township,
        attributes: [
          "id_township",
          "name_township",
          "history_township",
          "surface_township",
          "image_township",
        ],
      },
    })
  );
};

module.exports = {
  getAllDistrict,
  addDistrict,
  getOneDistrict,
  updateDistrict,
  getDistrictAndTownship,
  getDistrictByProvince,
};
