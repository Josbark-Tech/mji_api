const {
  parcel,
  historic_parcel,
  proprietaire,
  avenue,
  owner,
  historic_owner,
  certificate_registration,
  folder_parcel,
  sequelize,
} = require("../models");
const { cloudinary } = require("../utils/cloudinaryConfig");

const getOneParcelle = async (req, res) => {
  const { id_parcelle } = req.query;
  res.status(200).send(
    await parcel.findOne({
      where: {
        id_parcelle,
      },
      attributes: ["id_parcel", "ownerId", "avenueId", "number_parcel"],
      include: {
        model: avenue,
        attributes: ["id_avenue", "name_avenue"],
      },
    })
  );
};
const getAllParcelle = async (req, res) => {
  res.status(200).send(
    await parcel.findAll({
      attributes: ["id_parcel", "ownerId", "avenueId", "number_parcel"],
      include: [
        {
          model: avenue,
          attributes: ["id_avenue", "name_avenue"],
        },
        {
          model: owner,
          attributes: [
            "id_owner",
            "name_owner",
            "postname_owner",
            "firstname_owner",
            "dateofbirth",
            "nationality",
          ],
        },
        // {
        //   model: certificate_registration,
        //   attributes: ["surface", "cadastral_number"],
        //   where : { parcel.id == certificate_registration.parcelleId},
        //   right: false,
        // },
      ],
    })
  );
};
const addParcelle = async (req, res) => {
  const t = await sequelize.transaction();

  const {
    name_owner,
    postname_owner,
    firstname_owner,
    dateOfBirth,
    nationality,
    avenueId,
    number_parcel,
    cadastral_number,
    latitude,
    longitude,
    altitude,
    name_conservative,
    volume,
    folio,
    situation,
    description,
    surface,
    sketch,
    dead_of_sale,
    lodgers_book,
    pv_measurement_demarcation,
    dead_of_assignement,
  } = req.body;
  const staffId = req.user.id;
  try {
    const OwnerCreate = await owner.create(
      {
        name_owner,
        postname_owner,
        firstname_owner,
        dateofbirth: dateOfBirth,
        nationality,
        staffId,
      },
      { transaction: t }
    );
    await historic_owner.create(
      {
        id_owner: OwnerCreate.dataValues.id,
        name_owner,
        postname_owner,
        firstname_owner,
        dateofbirth: dateOfBirth,
        nationality,
        staffId,
        version: "1",
        action: "create",
      },
      { transaction: t }
    );
    const ParcelCreate = await parcel.create(
      {
        ownerId: OwnerCreate.dataValues.id,
        avenueId: avenueId,
        number_parcel: number_parcel,
        version: 1,
        action: "create",
      },
      { transaction: t }
    );
    
    const deedOfSaleResponse = await cloudinary.uploader.upload(dead_of_sale, {
      upload_preset: "chef_d_oeuvre",
    });
    const lodgersBookResponse = await cloudinary.uploader.upload(lodgers_book, {
      upload_preset: "chef_d_oeuvre",
    });
    const pvMeasurementResponse = await cloudinary.uploader.upload(
      pv_measurement_demarcation,
      {
        upload_preset: "chef_d_oeuvre",
      }
    );
    const deedOfAssignementResponse = await cloudinary.uploader.upload(
      dead_of_assignement,
      {
        upload_preset: "chef_d_oeuvre",
      }
    );
    await folder_parcel.create({
      deed_of_sale: deedOfSaleResponse.public_id,
      lodgers_book: lodgersBookResponse.public_id,
      pv_measurement_demarcation: pvMeasurementResponse.public_id,
      deed_of_assignement: deedOfAssignementResponse.public_id,
      parcelId: ParcelCreate.dataValues.id,
    });
    await historic_parcel.create(
      {
        id_parcel: ParcelCreate.dataValues.id,
        ownerId: OwnerCreate.dataValues.id,
        avenueId,
        number_parcel,
        version: 1,
        action: "create",
      },
      { transaction: t }
    );
    const cloudinaryResponse = await cloudinary.uploader.upload(sketch, {
      upload_preset: "chef_d_oeuvre",
    });
    const CertificateCreate = await certificate_registration.create(
      {
        cadastral_number,
        latitude,
        longitude,
        altitude,
        name_conservative,
        volume,
        folio,
        situation,
        description,
        surface,
        sketch: cloudinaryResponse.public_id,
        parcelId: ParcelCreate.dataValues.id,
      },
      { transaction: t }
    ); 
    res
      .status(200)
      .send(
        `La Parcelle ayant l'identifiant ${ParcelCreate.id_parcel} ajoutée avec succès`
      );
    await t.commit();
   
  } catch (error) {
    res
      .status(200)
      .send(`Impossible d'enregistré une erreur s'est produite  ${error}`);
    await t.rollback();
  }
};

const updateParcelle = async (req, res) => {
  const { id_parcelle } = req.query;
  const { proprietaireId, avenueId, numero } = req.body;
  const oldParcelle = findOne({
    where: {
      id_parcelle,
    },
  });
  await historique_parcelle.create({
    parcelleId: oldParcelle.id,
    proprietaireId: oldParcelle.proprietaireId,
    avenueId: oldParcelle.avenueId,
    numero: oldParcelle.numero,
  });
  const savedParcelle = await parcelle.update(
    {
      proprietaireId,
      avenueId,
      numero,
    },
    {
      where: {
        id_parcelle,
      },
    }
  );
  if (savedParcelle === true) {
    res.status(200).json({ message: "update successfully completed" });
  } else {
    res.send({ message: "update completed fails" });
  }
};
const getParcelleAndProprietaire = async (req, res) => {
  const { id_parcelle } = req.query;
  res.status(200).send(
    await parcelle.findOne({
      where: {
        id_parcelle,
      },
      attributes: ["id_parcelle", "proprietaireId", "avenueId", "numero"],
      include: {
        model: proprietaire,
        attributes: [
          "id_proprietaire",
          "nom_proprietaire",
          "postnom_proprietaire",
          "prenom_proprietaire",
          "date_naissance",
          "nationalite",
        ],
      },
    })
  );
};
const getArchiveParcelle = async (req, res) => {
  const { id_parcelle } = req.query;
  const parcelleId = await parcelle.findOne({
    where: {
      id_parcelle,
    },
    attributes: ["id"],
  });
  const info_now_parcelle = await parcelle.findOne({
    where: {
      id_parcelle,
    },
    attributes: ["id_parcelle", "proprietaireId", "avenueId", "numero"],
    include: {
      model: proprietaire,
      attributes: [
        "id_proprietaire",
        "nom_proprietaire",
        "postnom_proprietaire",
        "prenom_proprietaire",
        "date_naissance",
        "nationalite",
      ],
    },
  });
  const historyProprietaire = await historique_parcelle.findAll({
    where: {
      parcelleId: parcelleId.id,
    },
    include: {
      model: proprietaire,
      where: {
        id: proprietaireId,
      },
    },
  });
  res.status(200).send({ info_now_parcelle, historyProprietaire });
};
module.exports = {
  getAllParcelle,
  addParcelle,
  getOneParcelle,
  updateParcelle,
  getParcelleAndProprietaire,
  getArchiveParcelle,
};
