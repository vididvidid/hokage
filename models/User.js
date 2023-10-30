const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbWithSequelize"); // Assuming your db.js file is in the parent directory
const Notification = require("./Notification");


const User = sequelize.define("User", {
  // Define the User model properties and their data types
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING, // Use DataTypes.STRING or DataTypes.STRING(255) depending on your needs
    unique: true, // Optional, set to true if you want emails to be unique
    allowNull: false,
    validate: {
      isEmail: true, // You can add email format validation
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdOn: {
    type: DataTypes.DATE, // Use DataTypes.DATE for date and time values
    defaultValue: DataTypes.NOW, // Set the default value to the current timestamp
  },
  // Add more properties as needed
});

// Create the user table in the database
User.sync()
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });

User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
