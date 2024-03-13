const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImageUrl: { type: String, required: true },
  subject: { type: String, required: true } 
});

const Book = mongoose.model('Book', bookSchema);

// Search books by title / author
bookSchema.index({ title: 'text', author: 'text' });

module.exports = Book;
