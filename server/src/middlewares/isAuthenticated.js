const user = require("../models/user.mongo");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const userFound = await user.findOne({
      token: req.headers.authorization.replace("Bearer ", ""),
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = userFound;
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
};

module.exports = isAuthenticated;
