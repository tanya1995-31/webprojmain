const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // The origin of the frontend application
  credentials: true, // Allows cookies to be sent
};

// Apply CORS before other routes
app.use(cors(corsOptions));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/bookClub', {
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
