const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // replace with your frontend domain
    credentials: true, // this allows session cookies to be sent back and forth
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS before other routes
app.use(cors(corsOptions));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Use Cookie Parser
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookClub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Prefix all bookRoutes and authRoutes with '/api'
app.use('/api', bookRoutes);
app.use('/api', authRoutes);
app.use('/api', messageRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
