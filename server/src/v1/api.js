const express = require("express");
const equipementsRouter = require("./routes/equipements.router");

const api = express.Router();

api.use("/equipements", equipementsRouter);

module.exports = api;
