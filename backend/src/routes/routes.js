import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from './../controllers/test.js';
import { createQuestion, getQuestionsByTestId, getQuestionById, updateQuestion, deleteQuestion,getAllQuestions } from './../controllers/question.js';
import multer from 'multer';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { createResult, getResultById, getResultsByTestId } from './../controllers/result.js';
import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();




// Test routes
router.post('/tests', createTest);
router.get('/tests/:id', getTestById); 
router.get('/tests', getAllTests); 
router.put('/tests/:id', updateTest); 
router.delete('/tests/:id', deleteTest);  

// Question routes
router.post('/questions', createQuestion);  
router.get('/questions/test/:testId', getQuestionsByTestId);  
router.get('/questions/:id', getQuestionById);  
router.put('/questions/:id', updateQuestion); 
router.delete('/questions/:id', deleteQuestion);  
router.get('/getAllQuestion',getAllQuestions);

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Set the directory where the file will be stored
      cb(null, 'uploads/'); // 'uploads/' is the directory for storing images
    },
    filename: function (req, file, cb) {
      // Set the file name with timestamp to avoid name conflicts
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  // Set up multer to handle image uploads
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(file.originalname.toLowerCase());
      
      if (mimeType && extname) {
        return cb(null, true); // Accept the file
      } else {
        return cb(new Error('Only JPEG, JPG, and PNG files are allowed'), false); // Reject the file
      }
    }
  }).single('image'); // 'image' is the field name for the file upload
  
  // Route for creating a new user with file upload
  router.post("/users", upload, createUser);
  
  // Route for fetching all users
  router.get("/users", getAllUsers);
  
  // Route for fetching a user by ID
  router.get("/users/:id", getUserById);
  
  // Route for updating a user by ID (with file upload)
  router.put("/users/:id", upload, updateUser);
  
  // Route for deleting a user by ID
  router.delete("/users/:id", deleteUser);

  // Result routes
router.post('/results', createResult);  // Create a result
router.get('/results/:id', getResultById);  // Get a specific result by ID
router.get('/results/test/:testId', getResultsByTestId);  // Get all results for a specific test

  

export default router;
