const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbWithSequelize"); // Assuming your db.js file is in the parent directory

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  eventDetails: {
    type: DataTypes.TEXT, // You can use TEXT for additional event details
  },
});
// Create the Notification table in the database
Notification.sync()
  .then(() => {
    console.log("Notification table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating Notification table:", error);
  });

module.exports = Notification;
