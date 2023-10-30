const User = require("../models/User");
const logger = require("../helpers/logger");

async function getUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }, // Exclude the "password" field
    });

    if (!user) {
      logger.error("User not found", { userId });
      return res.status(404).json({ error: "User not found" });
    }

    logger.info("User details retrieved", { userId });
    res.send(user);
  } catch (error) {
    logger.error("Error getting user", { error });
    res.status(500).json({ error: "An error occurred while getting user details" });
  }
}

module.exports = {
  getUser
};
