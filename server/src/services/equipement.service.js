const mongoose = require("mongoose");
const equipement = require("../models/equipement.mongo");
const { v4: uuidv4 } = require("uuid");

const getAllEquipements = async () => {
  const allEquipements = await equipement.find({});
  return allEquipements;
};

const addEquipement = async (newEquipement) => {
  newEquipement.creationDate = new Date();
  newEquipement.id = uuidv4();
  const response = await equipement.create(newEquipement);
  return response;
};

const getEquipementById = async (id) => {
  const response = await isEquipmentExist(id);
  return response;
};

// Helper functions
const isEquipmentExist = async (id) => {
  try {
    const equipmentFinded = await equipement.findOne({ id: id });
    return equipmentFinded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEquipements,
  addEquipement,
  getEquipementById,
};
