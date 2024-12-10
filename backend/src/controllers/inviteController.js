import { sendEmail } from '../services/emailService.js';
import { logTestInvite } from '../models/inviteModel.js';
import { createTestInviteLink } from '../utils/testUtils.js'; 
import User from "../models/user.js";
export const sendTestInvite = async (req, res) => {
  const { email, testName, testId,userId } = req.body;
  console.log(testId,userId);

  
  if (!email || !testName || !testId || !userId) {
    return res.status(400).json({ error: 'Email, test name, and test ID are required.' });
  }

 
  const expirationTime = Date.now() + 60 * 60 * 1000; 
  const testLink = createTestInviteLink(testId,userId, email, expirationTime);

  const subject = `Online Assessment Invitation for Telus International`;
const messageHtml = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #000000;">Online Assessment Invitation for Telus International</h2>
  <p>Dear Candidate,</p>
  <p>Thank you for your interest in Telus International. As the next step in our recruitment process, we would like to invite you to complete an online assessment.</p>
  <p>Please find the details below:</p>
  <ul>
    <li><strong>Test Link:</strong> <a href="${testLink}" style="color: #4CAF50; text-decoration: none;">${testLink}</a></li>
    <li><strong>Duration:</strong> 1 hour</li>
    <li><strong>Deadline:</strong> This link will expire after 48 hours.</li>
  </ul>
  <p>Instructions:</p>
  <ul>
    <li>Ensure you have a stable internet connection before starting the test.</li>
    <li>Webcam should be working properly.</li>
    <li>The test must be completed within the given time frame.</li>
    <li>Please complete the test in one sitting.</li>
  </ul>
  <p>We wish you the best of luck and look forward to reviewing your results.</p>
  <p style="margin-top: 20px;">Best Regards,</p>
  <p>Team HR (Telus International)</p>
</div>
`;


  try {
    
    await sendEmail(email, subject, messageHtml);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await User.update({
        inviteStatus:true
      },
      { where:{"email":email}}
    );
    }
    
    
   
    res.status(200).json({ message: 'Test invite sent and logged successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send test invite.' });
  }
};

export default { sendTestInvite };