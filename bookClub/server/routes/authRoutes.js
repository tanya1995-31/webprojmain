const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Register user
router.post('/register', async (req, res) => { // Ensure endpoint is lowercase to match the client-side
    try {
        const { username, password, email } = req.body;
  
        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user with the hashed password
        const user = new User({ 
            username, 
            password: hashedPassword, // Use the hashed password here
            email 
        });
  
        // Save the new user
        await user.save();
  
        // Respond with success
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // This is the code for a duplicate key error in MongoDB
            res.status(409).json({ message: 'Username or email already exists' }); // Customize the error message as needed
        } else {
            res.status(500).json({ message: 'Error registering new user', error: error.message });
        }
    }
}); 

// Login route
router.post('/login', async (req, res) => {
    try {
        console.log(req);
        // Find the user by username
        const user = await User.findOne({ username: req.body.username });
        console.log(user);
  
        // Check if user exists
        if (user) {
            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            
            if (isMatch) {  
                // Create token
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                console.log("JWT_SECRET:", process.env.JWT_SECRET);
                // Send the JWT in a cookie
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // true if in production
                    maxAge: 3600000 // should match the token's expiration time
                });
  
                // Respond with token
                res.json({ message: "Login successful", username: user.username });
            } else {
                // Passwords do not match
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            // User not found
            res.status(401).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

// Verify route
router.get('/verify', (req, res) => {
    const token = req.cookies['token'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ isLoggedIn: false, message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ isLoggedIn: false, message: "Token verification failed" });
        }
        res.json({ isLoggedIn: true, username: decoded.username });
    });
});

  
module.exports = router;
