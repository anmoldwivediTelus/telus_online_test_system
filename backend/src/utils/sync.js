import sequelize from '../dataBase/sequelize.js';
import {Test,Question} from '../models/index.js';



(async () => {
  try { 
    await sequelize.sync({ alter: true  });
    console.log('Database synchronized.',Test);
    const test = await Test.create({
        title: 'JavaScript Basics Test',
        description: 'A basic test on JavaScript.',
      });
      const questions = [
        {
          testId: 1,
          questionText: "What is JavaScript?",
          options: {
            option1: "Programming Language",
            option2: "Scripting Language",
            option3: "Markup Language",
            option4: "Database",
          },
          correctOption: 1,
        },
        {
          testId: 1,
          questionText: "What is the correct file extension for JavaScript files?",
          options: {
            option1: ".java",
            option2: ".js",
            option3: ".javascript",
            option4: ".script",
          },
          correctOption: 2,
        },
        {
          testId: 1,
          questionText: "Which company developed JavaScript?",
          options: {
            option1: "Microsoft",
            option2: "Netscape",
            option3: "Sun Microsystems",
            option4: "Oracle",
          },
          correctOption: 2,
        },
        {
          testId: 1,
          questionText: "What keyword is used to declare a variable in JavaScript?",
          options: {
            option1: "var",
            option2: "int",
            option3: "string",
            option4: "let",
          },
          correctOption: 1,
        },
        {
          testId: 1,
          questionText: "Which of the following is a JavaScript framework?",
          options: {
            option1: "React",
            option2: "Laravel",
            option3: "Django",
            option4: "Spring",
          },
          correctOption: 1,
        },
        {
          testId: 1,
          questionText: "How can you add a comment in JavaScript?",
          options: {
            option1: "// This is a comment",
            option2: "/* This is a comment */",
            option3: "# This is a comment",
            option4: "<!-- This is a comment -->",
          },
          correctOption: 1,
        },
        {
          testId: 1,
          questionText: "Which symbol is used for single-line comments in JavaScript?",
          options: {
            option1: "//",
            option2: "/*",
            option3: "#",
            option4: "--",
          },
          correctOption: 1,
        },
        {
          testId: 1,
          questionText: "What method is used to print something to the console?",
          options: {
            option1: "print()",
            option2: "log()",
            option3: "console.log()",
            option4: "output()",
          },
          correctOption: 3,
        },
        {
          testId: 1,
          questionText: "Which of the following is not a data type in JavaScript?",
          options: {
            option1: "Undefined",
            option2: "Number",
            option3: "Boolean",
            option4: "Float",
          },
          correctOption: 4,
        },
        {
          testId: 1,
          questionText: "Which statement is used to stop a loop in JavaScript?",
          options: {
            option1: "break",
            option2: "exit",
            option3: "stop",
            option4: "end",
          },
          correctOption: 1,
        },
      ];
      
      console.log(questions);
      
      const question = await Question.bulkCreate(questions);
  
      console.log('Test created:', test.toJSON());
      console.log('Question created:', question.toJSON());
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
