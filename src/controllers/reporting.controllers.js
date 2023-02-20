const {
  staff,
  parcel,
  certificate_registration,
  sequelize,
} = require("../models");
const { Op, QueryTypes } = require("sequelize");

const certificateCountByMounth = async (req, res) => {
  if (req.user.is_admin == true) {
    const numberCertificate = await sequelize.query(
      `SELECT COUNT(id_certificate) as number from certificate_registrations where MONTH(createdAt) = MONTH(now())`,
      { type: QueryTypes.SELECT }
    );
    
    const numberParcel = await sequelize.query(
      `SELECT COUNT(id_parcel) as number from parcels where MONTH(createdAt) = MONTH(now())`,
      { type: QueryTypes.SELECT }
    );
    const numberTownship = await sequelize.query(
      `SELECT COUNT(id) as number from townships`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json({numberCertificate,numberParcel, numberTownship});
  } else {
    return res
      .status(400)
      .send("Accès refusé. Vous n'êtes pas un administrateur.");
  }
};
const month_year = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const reportingAnnual= async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const month_current = new Date().getMonth();
      const reporting_in_year = [];
      for (let i = 0; i <= month_current; i++) {
        reporting_in_year.push(
          ... await sequelize.query(
            'SELECT COUNT(id_certificate) as number  FROM certificate_registrations WHERE monthname(createdAt) = :monthParam',
            {
              replacements: {
                monthParam: month_year[i],
                plain: true,
              },
              nest: true,
              type: QueryTypes.SELECT,
            }
          )
        );
      }
      res.status(200).json(reporting_in_year);
    });
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};

module.exports = { certificateCountByMounth, reportingAnnual };
