import express from 'express';
import { createUser } from '../controllers/user/createUser.js';
import { loginUser } from '../controllers/user/loginUser.js';
import { getUserProfile } from '../controllers/user/getUserProfile.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);

export default router;
