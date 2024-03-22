import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments'; // Import the Comments component

const ViewBook = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const [book, setBook] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log(response.data); // Log the response data
        setBook(response.data); // Set the fetched book data to state
      } catch (error) {
        console.error('Failed to fetch book:', error);
      }
    };

    fetchBook(); // Call the fetchBook function
  }, [id]); // Depend on the book ID

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!commentText.trim() || !authorName.trim()) {
        // Check if either the comment text or author name is empty
        console.error('Comment text and author name are required');
        return;
      }
      await axios.post(`http://localhost:5000/api/books/${id}/comments`, { text: commentText, author: authorName });
      // Reset the comment text and author name after submission
      setCommentText('');
      setAuthorName('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };
  if (!book) {
    return <div>Loading...</div>; // Render a loading message while fetching book details
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <img src={book.coverImageUrl} alt={`Cover of ${book.title}`} />
      <form onSubmit={handleCommentSubmit}>
        {/* Input field for the author's name */}
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your Name"
        />
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>

      {/* Display more book details as needed */}
      <Comments bookId={id} />
    </div>
  );
};

export default ViewBook;