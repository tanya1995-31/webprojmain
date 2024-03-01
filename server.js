// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./user');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/bookClub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();
        // Send a JSON response indicating success
        res.status(201).json({ success: true, message: 'User signed up successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error signing up user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use(cors({
    origin: 'http://example.com' // replace with the domain you want to allow
  }));
  

  