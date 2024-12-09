// controllers/result.js
import Result from './../models/Result.js';
import Question from './../models/question.js';

// export const createResult = async (req, res) => {
//   try {
//     const { userId, testId, answers, totalTimeTaken } = req.body;
//     console.log(answers);

//     // Fetch questions for the test
//     const questions = await Question.findAll({ where: { testId } });
//     console.log(questions,"questiondata is fecthed");
//    // console.log(questions.dataValues.correctAnswer,"correct data")

//     let correctAnswers = 0;
//     let incorrectAnswers = 0;

//     // Check the answers
//     for (let question of questions) {
       
//       const userAnswer = answers[question.id];
//       //console.log(userAnswer)
//       //console.log(question.correctOption)
//       if (userAnswer === question.correctAnswer) {
        
//         correctAnswers++;
//       } else {
//         incorrectAnswers++;
//       }
//     }

//     const totalMarks = correctAnswers; // 1 mark per correct answer
//     const averageTimePerQuestion = totalTimeTaken / questions.length;

//     // Create a result record
//     const result = await Result.create({
//       userId,
//       testId,
//       attempted: questions.length,
//       correct: correctAnswers,
//       incorrect: incorrectAnswers,
//       totalMarks,
//       totalTimeTaken,
//       averageTimePerQuestion,
//     });

//     res.status(201).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create result' });
//   }
// };




export const createResult = async (req, res) => {
  try {
    const { userId, testId, answers, totalTimeTaken } = req.body;
    console.log("Received answers:", answers,typeof(answers));

    // Fetch questions for the test
    const questions = await Question.findAll({ where: { testId } });
    console.log("Questions fetched successfully:", questions);

    let correctAnswers = 0;
    let incorrectAnswers = 0;

    // Process the questions
    for (let question of questions) {
      const { id, correctAnswer } = question.dataValues; // Access actual question data

      const userAnswer = answers[id]; // Match the user's answer by question ID
      console.log("love")
      console.log(`Question ID: ${id}, User Answer: ${userAnswer}, Correct Answer: ${correctAnswer}`);

      if (userAnswer == correctAnswer) {
        correctAnswers++;
      } else if (userAnswer !== undefined) {
        // Count as incorrect only if the user attempted the question
        incorrectAnswers++;
      }
    }

    const totalQuestions = questions.length; 
    const attemptedQuestions = Object.keys(answers).length; 
    const unattemptedQuestions = totalQuestions - attemptedQuestions; 

    const totalMarks = correctAnswers; 
    const averageTimePerQuestion = totalTimeTaken / totalQuestions;

    // Create a result record
    const result = await Result.create({
      userId,
      testId,
      attempted: attemptedQuestions,
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      unattempted: unattemptedQuestions, // Save unattempted questions count
      totalMarks,
      totalTimeTaken,
      averageTimePerQuestion,
    });
    console.log(result)

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({ message: "Failed to create result" });
  }
};



export const getResultByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Result.findOne({ where: { userId } }); 

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve result' });
  }
};
// export const getResultById = async (req, res) => {
//   try {
//     console.log(req.params.id)
//     const result = await Result.findByPk(req.params.id);
    
//     if (!result) {
//       return res.status(404).json({ message: 'Result not found' });
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve result' });
//   }
// };

export const getResultsByTestId = async (req, res) => {
  try {
    const results = await Result.findAll({ where: { testId: req.params.testId } });
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve results for the test' });
  }
};


