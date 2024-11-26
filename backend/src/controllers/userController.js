import User from "../models/user.js";
import { Op } from "sequelize";

// Controller for creating a new user with file upload
export const createUser = async (req, res) => {
  try {
    const { name, email, testname, mobileNumber } = req.body;

    // If file is uploaded, use the file's path in the 'uploads/' directory
    const uploadedImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate if all required fields are present
    if (!name || !email || !mobileNumber) {
      return res.status(400).json({ message: "Name, Email, and Mobile Number are required." });
    }

    // Check if the user already exists based on email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Create a new user, including the image URL if a file is uploaded
    const user = await User.create({
      image: uploadedImage,
      name,
      email,
      testname,
      mobileNumber,
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
  const { name, email, testname, mobileNumber } = req.body;

  try {
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If a new image file is uploaded, update the image URL
    const uploadedImage = req.file ? `/uploads/${req.file.filename}` : user.image;

    // Update user details including the image path if uploaded
    await user.update({
      name,
      email,
      testname,
      mobileNumber,
      image: uploadedImage,  // Save the file URL to the image field
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
