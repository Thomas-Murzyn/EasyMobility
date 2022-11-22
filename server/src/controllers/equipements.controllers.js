const equipementService = require("../services/equipement.service");

const getAllEquipements = async (req, res) => {
  const allEquipements = await equipementService.getAllEquipements();
  return res.status(200).json(allEquipements);
};

const getEquipementById = async (req, res) => {
  if (req.params.equipementID) {
    const response = await equipementService.getEquipementById(
      req.params.equipementID
    );
    if (!response) {
      return res
        .status(400)
        .json({ error: "No equipment found with the provided id." });
    }
    return res.status(200).json(response);
  }
};

const addEquipement = async (req, res) => {
  if (
    req.body.name &&
    req.body.family &&
    req.body.condition &&
    req.body.price &&
    req.body.brand &&
    req.body.description
  ) {
    const { name, family, condition, price, brand, description } = req.body;
    const newEquipement = {
      name,
      family,
      condition,
      price,
      brand,
      description,
    };
    const response = await equipementService.addEquipement(newEquipement);
    return res.status(201).json(response);
  } else {
    return res.status(401).json({ error: "Missing equipement data." });
  }
};

const updateEquipement = (req, res) => {
  return res.send(`Updated equipement : ${req.params.equipementID}`);
};

const deleteEquipement = (req, res) => {
  return res.send(`Deleted equipement : ${req.params.equipementID}`);
};

module.exports = {
  getAllEquipements,
  getEquipementById,
  addEquipement,
  updateEquipement,
  deleteEquipement,
};
