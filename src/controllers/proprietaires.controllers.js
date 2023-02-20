const { historique_proprietaire, proprietaire, sequelize } = require("../models");

const getOneProprietaire = async (req, res) => {
  const { id_proprietaire } = req.query;
  res.send(
    await proprietaire.findOne({
      where: {
        id_proprietaire,
      },
      attributes: [
        "id_proprietaire",
        "nom_proprietaire",
        "prenom_proprietaire",
        "postnom_proprietaire",
        "date_naissance",
        "nationalite",
      ],
    })
  );
};
const getAllProprietaire = async (req, res) => {
  res.send(await proprietaire.findAll());
};
const addProprietaire = async (req, res) => {
  const { nom_proprietaire, postnom_proprietaire, prenom_proprietaire, date_naissance, nationalite, personnelId } =
    req.body;
  const newProprietaire = await proprietaire.create({
    nom_proprietaire,
    postnom_proprietaire,
    prenom_proprietaire,
    date_naissance,
    nationalite,
    personnelId,
  });
  res
    .status(200)
    .send(`La proprietaire de ${newProprietaire.nom_proprietaire} ajoutée avec succès`);
};

const updateProprietaire = async (req, res) => {
  const { id_proprietaire } = req.query;
  const { nom_proprietaire, postnom_proprietaire, prenom_proprietaire, date_naissance, nationalite, personnelId } =
    req.body;
  const oldVersionProprietaire = await proprietaire.findOne({
    where:{
      id_proprietaire,
    }
  })
  await historique_proprietaire.create({
    id_proprietaire:oldVersionProprietaire.id,
    nom_proprietaire:oldVersionProprietaire.nom_proprietaire,
    postnom_proprietaire:oldVersionProprietaire.postnom_proprietaire,
    prenom_proprietaire:oldVersionProprietaire.prenom_proprietaire,
    date_naissance:oldVersionProprietaire.date_naissance,
    nationalite:oldVersionProprietaire.nationalite,
    personnelId:oldVersionProprietaire.personnelId,
    version:oldVersionProprietaire.version+1,
    action:"update",
  })
  const savedProprietaire = await proprietaire.update(
    {
      nom_proprietaire,
      postnom_proprietaire,
      prenom_proprietaire,
      date_naissance,
      nationalite,
      personnelId,
    },
    {
      where: {
        id_proprietaire,
      },
    }
  );
  if (savedProprietaire === true) {
    res.status(200).json({ message: "update successfully completed" });
  } else {
    res.send({ message: "update completed fails" });
  }
};
module.exports = {
  getAllProprietaire,
  addProprietaire,
  getOneProprietaire,
  updateProprietaire,
};
