const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
        const { username, password } = req.body;
        
        // Find the user by username and ensure to populate necessary data if needed
        const user = await User.findOne({ username }).populate('favoriteBooks');
        
        if (!user) {
            // User not found
            return res.status(401).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Passwords do not match
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username }, // You could add more claims here if needed
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Consider adjusting based on your application's security requirements
        );

        // Prepare user data to send back
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            favoriteBooks: user.favoriteBooks.map(book => ({
                id: book._id,
                title: book.title,
                author: book.author,
                coverImageUrl: book.coverImageUrl,
                subject: book.subject
            })),
            favoriteSubjects: user.favoriteSubjects  // Ensure the user model supports this attribute
        };

        // Send the JWT in a cookie with appropriate security settings
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production environment only
            maxAge: 3600000,  // 1 hour
            sameSite: 'strict'  // Strict sameSite policy to prevent CSRF
        });

        // Respond with user data
        res.json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    //res.clearCookie('token');
    res.json({ message: 'Logout successful' });
});

// Verify route
router.get('/verify', (req, res) => {
    const token = req.cookies['token'];
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

// Update favorite subjects for the user
router.put('/update-favorite-subjects', async (req, res) => {
    const { userId, subjects } = req.body;  // Get user ID and subjects array from request body
    try {
        const user = await User.findById(userId);  // Find the user by ID
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.favoriteSubjects = subjects;  // Update the favoriteSubjects field
        await user.save();  // Save the updated user
        res.send('Favorite subjects updated');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;