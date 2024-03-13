// routes/bookRoutes.js
const express = require('express');
const axios = require('axios');
const Book = require('../models/Book');

const router = express.Router();

// Route to fetch and store books by subject
router.get('/fetch-books', async (req, res) => {
  try {
    const subjects = ['love', 'kids', 'fantasy'];
    for (const subject of subjects) {
      const url = `https://openlibrary.org/subjects/${subject}.json?limit=15`;
      const response = await axios.get(url);
      const booksData = response.data.works.map(work => ({
        title: work.title,
        author: work.authors.map(author => author.name).join(', '),
        coverImageUrl: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : null,
        subject: subject // Store the subject with each book
      }));

      // Save each book in MongoDB
      for (const bookData of booksData) {
        // Update the book if it exists, otherwise add a new one
        await Book.findOneAndUpdate(
          { title: bookData.title, author: bookData.author },
          bookData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
    }

    res.status(200).json({ message: 'Books fetched and stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch and store books', error: error.message });
  }
});

// Route to get all books from the database
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get books', error: error.message });
  }
});

// Get router for Seach Books
router.get('/search-books', async (req, res) => {
  try {
    const query = req.query.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Partial text search on title
        { author: { $regex: query, $options: 'i' } }, // Partial text search on author
      ]
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to search books', error: error.message });
  }
});

module.exports = router;