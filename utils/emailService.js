// emailService.js
const nodemailer = require('nodemailer');

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email service provider (e.g., Gmail, SendGrid, etc.)
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };