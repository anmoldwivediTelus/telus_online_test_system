import sequelize from "../dataBase/sequelize.js";
import User from "../models/user.js"; 
import Result from "../models/Result.js";
import { Test, Question } from "../models/index.js"; 


 

(async () => {
  try {
    // Sync all models (User, Test, Question)
    await sequelize.sync({ alter: true }); 
    console.log("Database synchronized.");

    //  // Optionally create a test user
    //  const user = await User.create({
    //   name: "John Doe",
    //   experience:2,
    //   inviteStatus:false,
    //   email: "johnaza.doe@example.com",
    //   technology: "Samplze Test",
    //   mobileNumber: "12314567890",
      
    // });
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

   


    const result = await Result.create({
      userId: 1, // Replace with an actual user ID
      testId: test.id,
      attempted: 5,
      correct: 4,
      incorrect: 1,
      totalMarks: 80, // Example total marks
      totalTimeTaken: 300, // Time in seconds
      averageTimePerQuestion: 60.0,
    });

    console.log("User created:", user.toJSON());
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();





// (async () => {
//   try {
//     // Sync all models (User, Test, Question)
//     await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
//     console.log("Database synchronized.");

//     // Create test and question as examples
//     const test = await Test.create({
//         title: 'JavaScript Basics Test',
//         description: 'A basic test on JavaScript.',
//       });
//       const questions = [
//         {
//           testId: 1,
//           questionText: "What is JavaScript?",
//           options: {
//             option1: "Programming Language",
//             option2: "Scripting Language",
//             option3: "Markup Language",
//             option4: "Database",
//           },
//           correctOption: 1,
//         },
//         {
//           testId: 1,
//           questionText: "What is the correct file extension for JavaScript files?",
//           options: {
//             option1: ".java",
//             option2: ".js",
//             option3: ".javascript",
//             option4: ".script",
//           },
//           correctOption: 2,
//         },
//         {
//           testId: 1,
//           questionText: "Which company developed JavaScript?",
//           options: {
//             option1: "Microsoft",
//             option2: "Netscape",
//             option3: "Sun Microsystems",
//             option4: "Oracle",
//           },
//           correctOption: 2,
//         },
//         {
//           testId: 1,
//           questionText: "What keyword is used to declare a variable in JavaScript?",
//           options: {
//             option1: "var",
//             option2: "int",
//             option3: "string",
//             option4: "let",
//           },
//           correctOption: 1,
//         },
//         {
//           testId: 1,
//           questionText: "Which of the following is a JavaScript framework?",
//           options: {
//             option1: "React",
//             option2: "Laravel",
//             option3: "Django",
//             option4: "Spring",
//           },
//           correctOption: 1,
//         },
//         {
//           testId: 1,
//           questionText: "How can you add a comment in JavaScript?",
//           options: {
//             option1: "// This is a comment",
//             option2: "/* This is a comment */",
//             option3: "# This is a comment",
//             option4: "<!-- This is a comment -->",
//           },
//           correctOption: 1,
//         },
//         {
//           testId: 1,
//           questionText: "Which symbol is used for single-line comments in JavaScript?",
//           options: {
//             option1: "//",
//             option2: "/*",
//             option3: "#",
//             option4: "--",
//           },
//           correctOption: 1,
//         },
//         {
//           testId: 1,
//           questionText: "What method is used to print something to the console?",
//           options: {
//             option1: "print()",
//             option2: "log()",
//             option3: "console.log()",
//             option4: "output()",
//           },
//           correctOption: 3,
//         },
//         {
//           testId: 1,
//           questionText: "Which of the following is not a data type in JavaScript?",
//           options: {
//             option1: "Undefined",
//             option2: "Number",
//             option3: "Boolean",
//             option4: "Float",
//           },
//           correctOption: 4,
//         },
//         {
//           testId: 1,
//           questionText: "Which statement is used to stop a loop in JavaScript?",
//           options: {
//             option1: "break",
//             option2: "exit",
//             option3: "stop",
//             option4: "end",
//           },
//           correctOption: 1,
//         },
//       ];
      
//       console.log(questions);
      
//       const question = await Question.bulkCreate(questions);
  
//   } catch (error) {
//     console.error("Error syncing database:", error);
//   }
// })();
