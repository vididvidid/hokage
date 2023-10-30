const User = require("../models/User");

// Controller function to update a username
const updateUsername = async (req, res) => {
  try {
    // Assuming you have a logged-in user's ID in the request object
    const userId = req.user.id;
    console.log(userId);
    // Assuming the new username is provided in the request body
    const newUsername = req.body.newUsername;
    console.log(newUsername);
    // Check if the new username is valid.
    if (!newUsername) {
      return res.status(400).json({ message: "Invalid new username" });
    }

    // Find the user by ID and update their username using Sequelize
    await User.update({ username: newUsername }, { where: { id: userId } });

    res.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "An error occurred while updating the username" });
  }
};

module.exports = {
  updateUsername,
};
