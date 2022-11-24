require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Connected to Mongo DB");
});

mongoose.connection.on("error", (error) => {
  console.log("Disconnected to Mongo DB");
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

// A utiliser avec les tests.
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
