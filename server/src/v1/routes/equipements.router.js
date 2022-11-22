const express = require("express");

const equipementsRouter = express.Router();
const {
  getAllEquipements,
  getEquipementById,
  addEquipement,
  updateEquipement,
  deleteEquipement,
} = require("../../controllers/equipements.controllers");

// get all equipements
equipementsRouter.get("/", getAllEquipements);

// get an existing equipement by id
equipementsRouter.get("/:equipementID", getEquipementById);

// add a new equipement
equipementsRouter.post("/", addEquipement);

// update an existing equipement
equipementsRouter.post("/:equipementID", updateEquipement);

// delete an equipement
equipementsRouter.delete("/:equipementID", deleteEquipement);

module.exports = equipementsRouter;
