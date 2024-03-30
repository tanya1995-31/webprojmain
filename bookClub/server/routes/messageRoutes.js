const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Adjust the path as necessary

router.post('/message', async (req, res) => {
  try {
    let { userName, message, time } = req.body;

    if (!message.trim()) {
        return res.status(400).json({ message: 'Message must not be empty.' });
    }

    // If userName is empty or only contains whitespace, adjust to "guest"
    if (!userName.trim()) {
    userName = "guest";
    }

    const newMessage = new Message({
      userName,
      message,
      time,
    }); 
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save the message' });
  }
});

module.exports = router;