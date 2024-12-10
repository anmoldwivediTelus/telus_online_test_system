import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from './../controllers/test.js';
import { createQuestion, getQuestionsByTestId, getQuestionById, updateQuestion, deleteQuestion, getAllQuestions } from './../controllers/question.js';
import multer from 'multer';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser,startTest } from "../controllers/userController.js";
import { createResult, getResultByUserId, getResultsByTestId } from './../controllers/result.js';
import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

// PostgreSQL Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'telus',
//   password: 'admin',
//   port: 5433,
// });

// Secret key for JWT
// const JWT_SECRET_KEY = 'dvs123';

// // Helper function to send the email
// const sendTestInviteEmail = async (user, token) => {
//   const link = `http://localhost:5000/take-test?token=${token}`;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'testsingh1907@gmail.com',
//       pass: 'wnomjzbexwufrhwz',
//     },
//   });

//   const mailOptions = {
//     from: 'testsingh1907@gmail.com',
//     to: user.email,
//     subject: 'Test Invitation',
//     text: `Click the link to take the test: ${link}`,
//   };

//   await transporter.sendMail(mailOptions);
// };



// Route to verify the token and allow the user to take the test
// router.get('/take-test', async (req, res) => {
//   const { token } = req.query;

//   if (!token) {
//     return res.status(400).send('Token is required');
//   }

//   try {
//     // Decode the token
//     const decoded = jwt.verify(token, JWT_SECRET_KEY);

//     // Check if the token exists and if it's expired
//     const inviteQuery = 'SELECT * FROM test_invites WHERE token = $1 AND user_id = $2';
//     const result = await pool.query(inviteQuery, [token, decoded.userId]);

//     if (result.rows.length === 0) {
//       return res.status(400).send('Invalid or expired token');
//     }

//     const invite = result.rows[0];

//     // Check if the token has expired
//     if (new Date() > new Date(invite.expires_at)) {
//       return res.status(400).send('The link has expired');
//     }

//     // Check if the test has already been taken
//     if (invite.test_taken) {
//       return res.status(400).send('You have already taken the test');
//     }

//     res.status(200).send('You can now take the test');
//   } catch (error) {
//     res.status(400).send('Invalid token');
//   }
// });




// Test routes
router.post('/tests', createTest);
router.get('/tests/:id', getTestById); 
router.get('/tests', getAllTests); 
router.put('/tests/:id', updateTest); 
router.delete('/tests/:id', deleteTest);  

// Question routes
router.post('/questions', createQuestion);  
router.get('/questions', getAllQuestions); 
router.get('/questions/test/:testId', getQuestionsByTestId);  
router.get('/questions/:id', getQuestionById);  
router.put('/questions/:id', updateQuestion); 
router.delete('/questions/:id', deleteQuestion);  

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
  router.post("/users", createUser);
  
  // Route for fetching all users
  router.get("/users", getAllUsers);
  
  // Route for fetching a user by ID
  router.get("/users/:id", getUserById);
  
  // Route for updating a user by ID (with file upload)
  router.put("/users/:id", updateUser);
  
  // Route for deleting a user by ID
  router.delete("/users/:id", deleteUser);

router.put('/users/start-test/:id',startTest);


  // Result routes
router.post('/results', createResult);  // Create a result
router.get('/results/:userId',getResultByUserId);
  // Get a specific result by ID
router.get('/results/test/:testId', getResultsByTestId);  // Get all results for a specific test

  

export default router;
