const User = require("../models/user.mongo");
const equipement = require("../models/equipement.mongo");
const { v4: uuidv4 } = require("uuid");

const getAllEquipements = async () => {
  const allEquipements = await equipement
    .find({})
    .populate("owner", "firstName lastName adress age");

  return allEquipements;
};

const addEquipement = async (newEquipement, user) => {
  try {
    const userFound = await User.findOne({ email: user.email });

    newEquipement.creationDate = new Date();
    newEquipement.id = uuidv4();
    newEquipement.owner = userFound;
    const response = await equipement.create(newEquipement);
    return response;
  } catch (error) {
    return error;
  }
};

const getEquipementById = async (id) => {
  const response = await isEquipmentExist(id);
  return response;
};

const updateEquipement = async (data, id) => {
  const { name, family, condition, price, brand, description } = data;
  const equipementToUpdate = await isEquipmentExist(id);
  if (equipementToUpdate) {
    equipementToUpdate.name = name;
    equipementToUpdate.family = family;
    equipementToUpdate.condition = condition;
    equipementToUpdate.price = price;
    equipementToUpdate.brand = brand;
    equipementToUpdate.description = description;

    const response = await equipementToUpdate.save();
    return response;
  }
  return equipementToUpdate;
};

const deleteEquipement = async (id) => {
  const response = isEquipmentExist(id);
  if (response) {
    const equipementToDelete = await equipement.deleteOne({ id });
    return response;
  }
  return response;
};

// Helper functions
const isEquipmentExist = async (id) => {
  try {
    const equipmentFinded = await equipement
      .findOne({ id: id })
      .populate("owner", "firstName lastName adress age");
    return equipmentFinded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllEquipements,
  addEquipement,
  getEquipementById,
  updateEquipement,
  deleteEquipement,
};
