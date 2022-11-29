const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password, age, adress } = req.body;

    if (!(email && firstName && lastName && password && age && adress)) {
      return res.status(400).json({ error: "Missing user fields." });
    }

    const response = await userService.register(req.body);
    if (!response) {
      return res.status(409).json({ error: "User already exists." });
    }

    return res.status(201).json({
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      token: response.token,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email, password)) {
      return res.status(400).json({ error: "All inputs are required." });
    }

    const response = await userService.login(req.body);

    if (response) {
      return res.status(200).json({
        email: response.email,
        token: response.token,
        userId: response.userId,
        firstName: response.firstName,
        lastName: response.lastName,
        adress: response.adress,
        age: response.age,
      });
    }

    return res.status(400).json({ error: "Invalid Credentials" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
