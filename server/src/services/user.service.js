require("dotenv").config();
const user = require("../models/user.mongo");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const register = async (data) => {
  try {
    const isUserExist = await user.findOne({ email: data.email });

    if (isUserExist) {
      return false;
    }

    const encryptedPassword = await bcrypt.hash(data.password, 10);
    const userId = uuidv4();
    const token = jwt.sign(
      {
        userId,
        email: data.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    const newUser = await user.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      age: data.age,
      adress: data.adress,
      password: encryptedPassword,
      userId,
      token,
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const login = async (data) => {
  const { email, password } = data;

  const userFound = await user.findOne({ email });

  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    const token = jwt.sign(
      {
        userId: userFound.userId,
        email: userFound.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );

    userFound.token = token;
    await userFound.save();
    return userFound;
  }

  return false;
};

module.exports = {
  register,
  login,
};
