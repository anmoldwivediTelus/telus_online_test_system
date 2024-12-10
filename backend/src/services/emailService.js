import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.EMAIL_PASS,)
console.log(process.env.EMAIL_PASS,)

export const sendEmail = async (to, subject, messageHtml) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: messageHtml, // Use HTML for formatting
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};