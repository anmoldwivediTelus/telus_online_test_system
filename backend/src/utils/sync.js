import sequelize from "../dataBase/sequelize.js";
import User from "../models/user.js"; // Import the User model
import { Test, Question } from "../models/index.js"; // Other models

(async () => {
  try {
    // Sync all models (User, Test, Question)
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    console.log("Database synchronized.");

    // Create test and question as examples
    const test = await Test.create({
      title: "JavaScript Basics Test",
      description: "A basic test on JavaScript.",
    });

    const question = await Question.create({
      testId: test.id,
      questionText: "What is JavaScript?",
      options: { option1: "Programming Language", option2: "Scripting Language" },
      correctOption: 1,
    });

    console.log("Test created:", test.toJSON());
    console.log("Question created:", question.toJSON());

    // Optionally create a test user
    const user = await User.create({
      image: "https://example.com/image.jpg",
      name: "John Doe",
      email: "john.doe@example.com",
      testname: "Sample Test",
      mobileNumber: "1234567890",
    });

    console.log("User created:", user.toJSON());
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
