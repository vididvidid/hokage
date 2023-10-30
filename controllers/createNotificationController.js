
const Notification = require('../models/Notification'); // Import the Notification model

const createNotification = async (userId, eventType, eventDetails = null) => {
  await Notification.create({
    userId,
    eventType,
    eventTimestamp: new Date(),
    eventDetails,
  });
};

module.exports = {
  createNotification,
};
