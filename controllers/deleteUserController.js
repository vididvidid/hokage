const User = require("../models/User");
const Sequelize = require("sequelize");

// Controller function to delete a user
const deleteUser = async (req, res) => {
  try {
    // Assuming you have a logged-in user's ID in the request object
    const userId = req.user.id;
    console.log(userId);

    // Check if the user ID is valid.
    if (!userId) {
      console.log("Invalid userid");
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID and delete them using Sequelize
    await User.destroy({ where: { id: userId } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.error("Error deleting user: Validation error");
      res.status(400).json({ message: "Validation error" });
    } else if (error instanceof Sequelize.DatabaseError) {
      console.error("Error deleting user: Database error");
      res.status(500).json({ message: "Database error" });
    } else {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "An error occurred while deleting the user" });
    }
  }
};

module.exports = {
  deleteUser,
};
