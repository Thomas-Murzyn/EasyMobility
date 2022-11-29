const equipementService = require("../services/equipement.service");

const getAllEquipements = async (req, res) => {
  const allEquipements = await equipementService.getAllEquipements();
  return res.status(200).json(allEquipements);
};

const getEquipementById = async (req, res) => {
  const response = await equipementService.getEquipementById(
    req.params.equipementID
  );
  if (!response) {
    return res
      .status(400)
      .json({ error: "No equipment found with the provided id." });
  }
  return res.status(200).json(response);
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
    const response = await equipementService.addEquipement(req.body, req.user);
    if (response) {
      return res.status(201).json({ message: "Equipment created." });
    }

    return res.status(400).json(response);
  }
  return res.status(400).json({ error: "Missing equipement data." });
};

const updateEquipement = async (req, res) => {
  const response = await equipementService.updateEquipement(
    req.body,
    req.params.equipementID
  );
  if (response) {
    return res.status(200).json({ message: "Equipment successfuly updated." });
  }
  return res.status(400).json({ error: "No equipement found." });
};

const deleteEquipement = async (req, res) => {
  const response = await equipementService.deleteEquipement(
    req.params.equipementID
  );
  if (response) {
    return res.status(200).json({ message: "Equipment deleted" });
  }
  return res.status(400).json({ error: "No equipement found." });
};

module.exports = {
  getAllEquipements,
  getEquipementById,
  addEquipement,
  updateEquipement,
  deleteEquipement,
};
