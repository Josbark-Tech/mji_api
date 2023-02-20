const { quarter, avenue, township, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const getOneQuarter = async (req, res) => {
  const { id_quarter } = req.query;
  res.send(
    await quarter.findOne({
      where: {
        id:id_quarter,
      },
      attributes: [
        "id",
        "id_quarter",
        "name_quarter",
        "surface_quarter",
        "history_quarter",
      ],
      include:{
        model:township,
        attributes:["id","name_township"],
      }
    })
  );
};

const getQuarterByProvince = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { provinceId } = req.query;
    res.status(200).json(
      await sequelize.query(
        `
          SELECT q.id, q.name_quarter, q.surface_quarter, q.history_quarter, q.townshipId, t.name_township, d.provinceId 
          from quarters q inner join townships t on q.townshipId = t.id inner join districts d on t.districtId = d.id
          where d.provinceId = ${provinceId}
      `,
        { type: QueryTypes.SELECT, transaction: t }
      )
    );
    await t.commit();
  } catch (error) {
    res.status(400).json({ error: ` ${error}` });
  }
};

const getAllQuarter = async (req, res) => {
  res.send(await quarter.findAll());
};

const addQuarter = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { name_quarter, history_quarter, surface_quarter, townshipId } =
      req.body;
    const townshipFound = await township.findOne({
      where: {
        id: townshipId,
      },
    });
    if (townshipFound) {
      const savedQuarter = await quarter.create(
        {
          name_quarter,
          history_quarter,
          surface_quarter,
          townshipId: townshipFound.id,
        },
        {
          transaction: t,
        }
      );
      if (savedQuarter) {
        await t.commit();
        res.status(200).json({ message: "Enregistrement effectué avec succès" });
      } else {
        await t.rollback();
        res.send({ message: "add completed fails" });
      }
    } else {
      await t.rollback();
      res.status(400).send({ message: "La commune spécifier n'existe pas" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateQuarter = async (req, res) => {
  // const { id_quarter } = req.query;
  const { name_quarter, history_quarter, surface_quarter, townshipId, id_quarter } =
    req.body;
  const townshipFound = await township.findOne({
    where: {
      id: townshipId,
    },
  });
  if (townshipFound) {
    const savedQuarter = await quarter.update(
      {
        name_quarter,
        history_quarter,
        surface_quarter,
        townshipId: townshipFound.id,
      },
      {
        where: {
          id:id_quarter,
        },
      }
    );
    if (savedQuarter) {
      res.status(200).json({ message: "Mise à jour du quartier effectuée avec succès" });
    } else {
      res.send({ message: "update completed fails" });
    }
  } else {
    res.status(400).send({ message: "La commune spécifier n'existe pas" });
  }
};
const getQuarterAndAvenue = async (req, res) => {
  const { id_quarter } = req.query;
  res.status(200).send(
    await quarter.findOne({
      where: {
        id_quarter,
      },
      attributes: [
        "id_quarter",
        "name_quarter",
        "surface_quarter",
        "history_quarter",
      ],
      include: {
        model: avenue,
        attributes: ["id_avenue", "name_avenue"],
      },
    })
  );
};
module.exports = {
  getAllQuarter,
  addQuarter,
  getOneQuarter,
  updateQuarter,
  getQuarterAndAvenue,
  getQuarterByProvince,
};
