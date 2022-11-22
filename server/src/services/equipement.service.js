const mongoose = require("mongoose");
const equipement = require("../models/equipement.mongo");

const getAllEquipements = async () => {
  const allEquipements = await equipement.find({});
  return allEquipements;
};

const addEquipement = async (newEquipement) => {
  newEquipement.creationDate = new Date();
  const response = await equipement.create(newEquipement);
  return response;
};

module.exports = {
  getAllEquipements,
  addEquipement,
};
