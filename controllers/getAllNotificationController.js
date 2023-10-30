const Notification = require("../models/Notification");

// Controller function to get all notifications for a user
const getAllNotifications = async (req, res) => {
  try {
    // Assuming you have the user's ID in the request object (you can fetch it from the token or any other source)
    const userId = req.user.id;
    
    // Query the database to fetch all notifications for the user
    const notifications = await Notification.findAll({ where: { userId } });

    res.json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "An error occurred while fetching notifications" });
  }
};

module.exports = {
  getAllNotifications,
};
