import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from './../controllers/test.js';
import { createQuestion, getQuestionsByTestId, getQuestionById, updateQuestion, deleteQuestion } from './../controllers/question.js';

const router = express.Router();

// Test routes
router.post('/tests', createTest);  // Create a test
router.get('/tests', getAllTests);  // Get all tests
router.get('/tests/:id', getTestById);  // Get a test by ID
router.put('/tests/:id', updateTest);  // Update a test
router.delete('/tests/:id', deleteTest);  // Delete a test

// Question routes
router.post('/questions', createQuestion);  // Create a question
router.get('/questions/test/:testId', getQuestionsByTestId);  // Get all questions by test ID
router.get('/questions/:id', getQuestionById);  // Get a question by ID
router.put('/questions/:id', updateQuestion);  // Update a question
router.delete('/questions/:id', deleteQuestion);  // Delete a question

export default router;
