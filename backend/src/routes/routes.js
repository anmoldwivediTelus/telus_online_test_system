import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from './../controllers/test.js';
import { createQuestion, getQuestionsByTestId, getQuestionById, updateQuestion, deleteQuestion } from './../controllers/question.js';

const router = express.Router();

// Test routes
router.post('/tests', createTest);  // Create a test
router.get('/tests', getAllTests); 
router.get('/tests/:id', getTestById); 
router.put('/tests/:id', updateTest); 
router.delete('/tests/:id', deleteTest);  

// Question routes
router.post('/questions', createQuestion);  
router.get('/questions/test/:testId', getQuestionsByTestId);  
router.get('/questions/:id', getQuestionById);  
router.put('/questions/:id', updateQuestion); 
router.delete('/questions/:id', deleteQuestion);  

export default router;
