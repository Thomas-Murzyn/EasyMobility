const express = require("express");
const app = express();
const apiV1 = require("./v1/api");

app.use(express.json());
app.use("/v1", apiV1);

module.exports = app;
