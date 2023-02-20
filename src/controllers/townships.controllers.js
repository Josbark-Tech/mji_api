const { township, district, quarter, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const { cloudinary } = require("../utils/cloudinaryConfig");

const getOneTownship = async (req, res) => {
  const { id_township } = req.query;
  res.send(
    await township.findOne({
      where: {
        id_township,
      },
      attributes: [
        "id_township",
        "name_township",
        "surface_township",
        "history_township",
        "districtId",
      ],
      include: {
        model: district,
        attributes: ["id_district", "name_district", "surface_district"],
      },
    })
  );
};

const getAllTownship = async (req, res) => {
  res.send(
    await township.findAll({
      attributes: [
        "id",
        "id_township",
        "name_township",
        "surface_township",
        "history_township",
        "districtId",
      ],
      include: {
        model: district,
        attributes: ["name_district", "surface_district"],
      },
    })
  );
};

const addTownship = async (req, res) => {
  const {
    name_township,
    history_township,
    surface_township,
    districtId,
    image_township,
  } = req.body;
  try {
    const districtFound = await district.findOne({
      where: {
        id: districtId,
      },
    });
    if (districtFound) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        image_township,
        {
          upload_preset: "chef_d_oeuvre",
        }
      );
      const newtownship = await township.create({
        name_township,
        history_township,
        surface_township,
        image_township: cloudinaryResponse.public_id,
        districtId: districtFound.id,
      });
      res
        .status(200)
        .send(`La commune de ${newtownship.name_township} ajoutée avec succès`);
    } else {
      res
        .status(400)
        .send({ message: "Enregistrement echoué car ce district n'existe " });
    }
  } catch (err) {
    res.status(500).send({ error: "image upload fails" });
  }
};

const updateTownship = async (req, res) => {
  const { id_township } = req.query;
  const { name_township, history_township, surface_township, districtId } =
    req.body;
  const districtFound = await district.findOne({
    where: {
      id_district: districtId,
    },
  });
  if (districtFound) {
    const savedtownship = await township.update(
      {
        name_township,
        history_township,
        surface_township,
        districtId: districtFound.id,
      },
      {
        where: {
          id_township,
        },
      }
    );
    if (savedtownship) {
      res.status(200).json({ message: "update successfully completed" });
    } else {
      res.send({ message: "update completed fails" });
    }
  } else {
    res.status(400).send({ message: "District not found" });
  }
};

const getTownshipAndQuarter = async (req, res) => {
  const { id_township } = req.query;
  res.status(200).send(
    await township.findOne({
      where: {
        id_township,
      },
      attributes: [
        "id_township",
        "name_township",
        "surface_township",
        "history_township",
        "districtId",
      ],
      include: {
        model: quarter,
        attributes: [
          "id_quarter",
          "name_quarter",
          "history_quarter",
          "surface_quarter",
        ],
      },
    })
  );
};

const getTownshipByProvince = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_province } = req.query;
    res.status(200).json(
      await sequelize.query(
        `
          SELECT t.id, t.name_township, t.surface_township, t.image_township,
           t.history_township, d.provinceId
          from townships t inner join districts d on t.districtId = d.id
          where d.provinceId = ${id_province}
      `,
        { type: QueryTypes.SELECT, transaction: t }
      )
    );
    await t.commit();
  } catch (error) {
    res.status(400).json({ error: ` ${error}` });
  }
};

module.exports = {
  getAllTownship,
  addTownship,
  getOneTownship,
  updateTownship,
  getTownshipAndQuarter,
  getTownshipByProvince,
};
