import express from 'express';
import { sendTestInvite } from '../controllers/inviteController.js';

const router = express.Router();


router.post('/send-invite', sendTestInvite);

export default router;