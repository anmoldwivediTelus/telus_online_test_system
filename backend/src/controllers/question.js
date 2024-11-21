import  Question  from './../models/question.js';  // Import the Question model

// Create a new Question
export const createQuestion = async (req, res) => {
  try {
    const { testId, questionText, options, correctOption } = req.body;
    const newQuestion = await Question.create({
      testId,
      questionText,
      options,
      correctOption
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create question' });
  }
};

// Get all questions for a specific test
export const getQuestionsByTestId = async (req, res) => {
  try {
    const testId = req.params.testId;
     
     const questions = await Question.findAll({
       where: { testId }
     });
     
     if (questions.length === 0) {
       return res.status(404).json({ message: 'No questions found for this test' });
     }
     res.status(200).json(questions);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Failed to retrieve questions' });
   }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve question' });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const { questionText, options, correctOption } = req.body;
    question.questionText = questionText;
    question.options = options;
    question.correctOption = correctOption;

    await question.save();
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update question' });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.destroy();
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete question' });
  }
};