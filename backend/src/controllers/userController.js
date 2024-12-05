import User from "../models/user.js";
import { Op } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

// Controller for creating a new user with file upload and updating isTestDone
export const createUser = async (req, res) => {
  try {
    const { name, email, technology, mobileNumber, experience, isTestDone = false } = req.body; // Include isTestDone with default value false
    await sequelize.sync({ alter: true });

    console.log(name, email, technology, mobileNumber, experience, isTestDone);

    // Validate if all required fields are present
    if (!name || !email || !mobileNumber || !technology || !experience) {
      return res.status(400).json({ message: "Name, Email, Experience, Technology, and Mobile Number are required." });
    }

    // Check if the user already exists based on email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Create a new user with isTestDone property
    const user = await User.create({
      name,
      email,
      mobileNumber,
      technology,
      experience,
      isTestDone // Set default value to false
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for fetching all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for fetching a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for updating a user by ID (with file upload)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, technology, mobileNumber, experience, isTestDone } = req.body;

  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details including isTestDone
    await user.update({
      name,
      email,
      technology,
      mobileNumber,
      experience,
      isTestDone
    });

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for deleting a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller for starting a test (update isTestDone)
export const startTest = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isTestDone) {
      return res.status(400).json({ message: "User has already completed the test." });
    }

    await user.update({ isTestDone: true });

    return res.status(200).json({ message: "Test status updated. User can now take the test.", user });
  } catch (error) {
    console.error("Error updating test status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
