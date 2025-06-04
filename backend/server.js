// Import required modules
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const validateContactInput = require("./utils/validateContactInput");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests


// Setup Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER, // Email address sending the message
    pass: process.env.APP_PASSWORD, // Gmail app password (not regular password)
  }
});

// Define POST endpoint for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, message, nickname } = req.body;

  // Validate incoming data
  const { error } = validateContactInput({ name, email, message, nickname });
  if (error) {
    console.error("Validation error:", error);
    return res.status(400).json({ error }); // Send validation error to client
  }

  try {
    // Send email using Nodemailer
    await transporter.sendMail({
      from: `"Alexander Portfolio" <${process.env.SENDER}>`, // Sender info
      to: process.env.RECEIVER, // Recipient email
      subject: `New message from ${name}`,
      replyTo: email, // Allows receiver to reply directly to sender
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // Respond with success
    res.status(200).json({ message: `Email sent successfully to ${process.env.RECEIVER}` });
  } catch (err) {
    // Handle errors
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Start the server on defined PORT or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
