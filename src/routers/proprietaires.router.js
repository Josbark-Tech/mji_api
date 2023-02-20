const express = require("express");
const { validatedProprietaire } = require("../middlewares/proprietaire/validatorNewProprietaire.middleware");
const {
  getAllProprietaire,
  addProprietaire,
  getOneProprietaire,
  updateProprietaire,
} = require("../controllers/proprietaires.controllers");
const { validatedGetOneProprietaire } = require("../middlewares/proprietaire/validatorGetProprietaire.middleware");
const proprietaireRouter = express.Router();

proprietaireRouter.get("/",validatedGetOneProprietaire, getOneProprietaire)
proprietaireRouter.get("/All", getAllProprietaire);
proprietaireRouter.post("/", validatedProprietaire, addProprietaire);
proprietaireRouter.put("/",validatedGetOneProprietaire,validatedProprietaire,updateProprietaire);

module.exports = proprietaireRouter;
