import { sendEmail } from '../services/emailService.js';
import { logTestInvite } from '../models/inviteModel.js';
import { createTestInviteLink } from '../utils/testUtils.js'; 

export const sendTestInvite = async (req, res) => {
  const { email, testName, testId } = req.body;

  
  if (!email || !testName || !testId) {
    return res.status(400).json({ error: 'Email, test name, and test ID are required.' });
  }

 
  const expirationTime = Date.now() + 60 * 60 * 1000; 
  const testLink = createTestInviteLink(testId, email, expirationTime);

  const subject = `Invitation to take the "${testName}" test`;
  const message = `
    Hello,
    
    You have been invited to take the "${testName}" test.
    Click the link below to start:
    ${testLink}
    
    This link will expire in 1 hour.

    Best regards,
    Telus Online Test Platform
  `;

  try {
    
    await sendEmail(email, subject, message);

    
    await logTestInvite(email, testName, testLink, expirationTime);

   
    res.status(200).json({ message: 'Test invite sent and logged successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send test invite.' });
  }
};

export default { sendTestInvite };
