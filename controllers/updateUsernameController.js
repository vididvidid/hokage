const User = require("../models/User");
const { createNotification } = require("./createNotificationController"); // Import the createNotification function
const logger = require("../helpers/logger"); // Import your logger
// Controller function to update a username
const updateUsername = async (req, res) => {
  try {
    // Assuming you have a logged-in user's ID in the request object
    const userId = req.user.id;
    // Assuming the new username is provided in the request body
    const newUsername = req.body.newUsername;
    // Check if the new username is valid.
    if (!newUsername) {
      return res.status(400).json({ message: "Invalid new username" });
    }

    // Find the user by ID and update their username using Sequelize
    await User.update({ username: newUsername }, { where: { id: userId } });

    // Create a notification for the username update
    await createNotification(userId, 'username_updated');

    res.json({ message: "Username updated successfully" });
  } catch (error) {
    logger.error("Error updating username:", error);
    // Create a notification for the error
    await createNotification(userId, 'username_update_failed', "An error occurred while updating the username");

    res.status(500).json({ message: "An error occurred while updating the username" });
  }
};

module.exports = {
  updateUsername,
};
