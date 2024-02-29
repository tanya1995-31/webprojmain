import express from 'express';
import { connectToDb, getDb } from './db.js'; // Adjusted relative path
import User from './user.js';

const app = express();

app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
        db = getDb();
    }
});

// Routes
app.get('/users', (req, res) => {
    res.json({ mssg: "welcome to the api" });
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Use the User model to create a new user
    const user = new User({ username, email, password });
    
    // Save the new user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});