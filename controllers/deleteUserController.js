const User = require("../models/User");
const Sequelize = require("sequelize");
const logger = require("../helpers/logger");

// Controller function to delete a user
const deleteUser = async (req, res) => {
  try {
    // Assuming you have a logged-in user's ID in the request object
    const userId = req.user.id;

    // Check if the user ID is valid.
    if (!userId) {
      logger.error("Invalid user ID");
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID and delete them using Sequelize
    await User.destroy({ where: { id: userId } });

    logger.info("User deleted successfully");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      logger.error("Error deleting user: Validation error");
      res.status(400).json({ message: "Validation error" });
    } else if (error instanceof Sequelize.DatabaseError) {
      logger.error("Error deleting user: Database error");
      res.status(500).json({ message: "Database error" });
    } else {
      logger.error("Error deleting user", { error: error });
      res.status(500).json({ message: "An error occurred while deleting the user" });
    }
  }
};

module.exports = {
  deleteUser,
};
