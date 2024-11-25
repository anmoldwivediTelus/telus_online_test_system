import { DataTypes } from "sequelize";
import sequelize from './../dataBase/sequelize.js';

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, can hold the path to the uploaded image
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures no duplicate emails
      validate: {
        isEmail: true, // Validates the format
      },
    },
    testname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true, // Validates the input contains only numbers
        len: [10, 15], // Ensures the length of the mobile number
      },
    },
  },
  {
    tableName: "users", // Database table name
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default User;
