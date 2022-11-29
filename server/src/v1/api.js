const express = require("express");
const equipementsRouter = require("./routes/equipements.router");
const userRouter = require("./routes/user.router");

const api = express.Router();

api.use("/equipements", equipementsRouter);
api.use("/user", userRouter);

module.exports = api;
