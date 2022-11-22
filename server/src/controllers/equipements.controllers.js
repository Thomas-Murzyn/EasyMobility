const equipementService = require("../services/equipement.service");

const getAllEquipements = async (req, res) => {
  const allEquipements = await equipementService.getAllEquipements();
  res.status(200).json(allEquipements);
};

const getEquipementById = (req, res) => {
  res.send(`get equipement : ${req.params.equipementID}`);
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
    res.status(201).json(response);
  } else {
    res.status(401).json({ error: "Missing equipement data." });
  }
};

const updateEquipement = (req, res) => {
  res.send(`Updated equipement : ${req.params.equipementID}`);
};

const deleteEquipement = (req, res) => {
  res.send(`Deleted equipement : ${req.params.equipementID}`);
};

module.exports = {
  getAllEquipements,
  getEquipementById,
  addEquipement,
  updateEquipement,
  deleteEquipement,
};
