const { staff, sequelize } = require("../models");
const SendMail = require("../utils/nodeMailler");

const addStaff = async (req, res) => {
  if (req.user.is_admin == true) {
    const result = await sequelize.transaction(async (t) => {
      try {
        const {
          name_staff,
          firstname_staff,
          postname_staff,
          password,
          email,
          is_admin,
          sexe,
          status,
          password_brut,
        } = res;
        const alreadyExistsStaff = await staff.findOne({
          where: { email: req.body.email },
        });
        if (!alreadyExistsStaff) {
          // const savedStaff = await staff.create({
          //   name_staff,
          //   firstname_staff,
          //   postname_staff,
          //   password,
          //   email,
          //   is_admin,
          //   sexe,
          //   status,
          // });
          const savedStaff = await staff.create(res);
          if (savedStaff) {
            const responseSendMail = SendMail(
              email,
              password_brut,
              firstname_staff
            );
            if (responseSendMail) {
              return (
                res
                  // .status(200)
                  .send(
                    `Le personnel ${savedStaff.name_staff} ${savedStaff.firstname_staff} ajouté avec succès`
                  )
              );
            }
          } else {
            return (
              res
                // .status(400)
                .send({
                  erreur: "La requête échouée ",
                  message: `Création du compte échoué, Veuillez réessayer plutard`,
                })
            );
          }
        } else {
          return (
            res
              // .status(200)
              .json({
                erreur: "La requête échouée",
                message: `Le personnel ayant l'adresse mail ${email} existe déja`,
              })
          );
        }
      } catch (error) {
        return (
          res
            // .status(400)
            .json({ erreur: "La requête échouée ", message: `${error} ${t}` })
        );
      }
    });
  } else {
    return res
      .status(400)
      .send("Accès refusé. Vous n'êtes pas un administrateur.");
  }
};

const updateStaff = async (req, res) => {
  if (req.user.id_user !== res.id_user) {
    return res.status(400).send("Access denied. Can't update another user.");
  }
  // const verifyPassword = await compare(res.old_password, req.user.password);
  // if (!verifyPassword) {
  //   return res.status(400).send("password not correct");
  // }

  const { id_staff } = req.query;
  const staffFind = await staff.findOne({ where: { id_staff } });
  try {
    const result = await sequelize.transaction(async (t) => {
      if (staffFind) {
        const {
          name_staff,
          firstname_staff,
          postname_staff,
          personnalnumber,
          password,
          username,
          email,
          is_admin,
          sexe,
          status,
        } = res;
        const updatedStaff = await staff.update(
          {
            name_staff,
            firstname_staff,
            postname_staff,
            // personnalnumber,
            // password,
            username,
            email,
            is_admin,
            sexe,
            status,
          },
          {
            where: {
              id_staff,
            },
          }
        );
        if (updatedStaff) {
          res
            // .status(200)
            .send(
              `Mise à jour effectuée avec succès pour le personnel ${staffFind.name_staff} ${staffFind.firstname_staff}`
            );
        } else {
          res
            // .status(400)
            .send(
              `Mise à jour effectuée échoue pour le personnel ${staffFind.name_staff} ${staffFind.firstname_staff}`
            );
        }
      } else {
        res.json({ error: "erreur", message: "This staff not found" });
      }
    });
  } catch (error) {
    return (
      res
        // .status(400)
        .json({
          message: `Impossible de mettre à jour ce personnel ${staffFind.name_staff} ${staffFind.postname_staff} ${Error}`,
        })
    );
  }
};

const getAllStaff = async (req, res) => {
  res.status(200).send(
    await staff.findAll({
      attributes: {
        exclude: ["id", "deletedAt", "password"],
        order: ["id", "DESC"],
      },
    })
  );
};

const getOneStaff = async (req, res) => {
  const { id_staff } = res;
  const oneStaff = await staff.findOne({
    where: { id_staff },
    attributes: { exclude: ["id", "deletedAt", "password"] },
  });
  if (oneStaff) {
    res.status(200).json(oneStaff);
  } else {
    res.status(400).json({
      message: `Personnel with ID ${id_staff} cannot be found  `,
    });
  }
};

const deleteStaff = async (req, res) => {
  if (req.user.is_admin !== true){
    return res.status(400).send("Accès refusé. Vous n'êtes pas un administrateur.");
  }
  const { id_staff } = res;
  const staffDelete = await staff.destroy({
    where: {
      id_staff,
    },
  });
  if (staffDelete) {
    return res.status(200).json({
      message: `Le personnel supprimé avec succès`,
    });
  }else{
    return res.status(500).json({
      message: `Opération de suppression échouée. Veuillez réessayer plus tard`,
    });
  }
};

module.exports = {
  addStaff,
  updateStaff,
  getAllStaff,
  getOneStaff,
  deleteStaff,
};
