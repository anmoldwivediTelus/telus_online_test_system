import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from './../controllers/test.js';
import { createQuestion, getQuestionsByTestId, getQuestionById, updateQuestion, deleteQuestion } from './../controllers/question.js';
import multer from 'multer';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { createResult, getResultById, getResultsByTestId } from './../controllers/result.js';
import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();

// PostgreSQL Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'telus',
  password: 'admin',
  port: 5432,
});

// Secret key for JWT
const JWT_SECRET_KEY = 'dvs123';

// Helper function to send the email
const sendTestInviteEmail = async (user, token) => {
  const link = `http://localhost:5000/take-test?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testsingh1907@gmail.com',
      pass: 'wnomjzbexwufrhwz',
    },
  });

  const mailOptions = {
    from: 'testsingh1907@gmail.com',
    to: user.email,
    subject: 'Test Invitation',
    text: `Click the link to take the test: ${link}`,
  };

  await transporter.sendMail(mailOptions);
};

// Route to send the test invite
router.post('/send-test-invite', async (req, res) => {
  const { email } = req.body;

  // Retrieve the user by email from your users table
  const userQuery = 'SELECT id, email FROM users WHERE email = $1';
  const userResult = await pool.query(userQuery, [email]);

  if (userResult.rows.length === 0) {
    return res.status(400).send('User not found');
  }

  const user = userResult.rows[0];
  const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

  // Store the token and expiration date in the test_invites table
  const query = 'INSERT INTO test_invites (user_id, token, expires_at) VALUES ($1, $2, $3)';
  await pool.query(query, [user.id, token, expiresAt]);

  // Send the email to the user
  await sendTestInviteEmail(user, token);

  res.status(200).send('Test invitation sent');
});

// Route to verify the token and allow the user to take the test
router.get('/take-test', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Check if the token exists and if it's expired
    const inviteQuery = 'SELECT * FROM test_invites WHERE token = $1 AND user_id = $2';
    const result = await pool.query(inviteQuery, [token, decoded.userId]);

    if (result.rows.length === 0) {
      return res.status(400).send('Invalid or expired token');
    }

    const invite = result.rows[0];

    // Check if the token has expired
    if (new Date() > new Date(invite.expires_at)) {
      return res.status(400).send('The link has expired');
    }

    // Check if the test has already been taken
    if (invite.test_taken) {
      return res.status(400).send('You have already taken the test');
    }

    res.status(200).send('You can now take the test');
  } catch (error) {
    res.status(400).send('Invalid token');
  }
});

// Route to submit the test answers
router.post('/submit-test', async (req, res) => {
  const { token, answers } = req.body;

  if (!token || !answers) {
    return res.status(400).send('Token and answers are required');
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Mark the test as taken in the database
    const updateQuery = 'UPDATE test_invites SET test_taken = TRUE WHERE token = $1';
    await pool.query(updateQuery, [token]);

    res.status(200).send('Test submitted successfully');
  } catch (error) {
    res.status(400).send('Error submitting test');
  }
});

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
