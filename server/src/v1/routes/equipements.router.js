const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");

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
equipementsRouter.post("/", isAuthenticated, addEquipement);

// update an existing equipement
equipementsRouter.put("/:equipementID", isAuthenticated, updateEquipement);

// delete an equipement
equipementsRouter.delete("/:equipementID", isAuthenticated, deleteEquipement);

module.exports = equipementsRouter;
