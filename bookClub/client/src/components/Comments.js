import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ bookId }) => {
  // State to store comments
  const [comments, setComments] = useState([]);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${bookId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  // Fetch comments initially and start polling for updates when the component mounts
  useEffect(() => {
    fetchComments(); // Fetch comments initially

    const interval = setInterval(fetchComments, 5000); // Poll for updates every 5 seconds

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [bookId]); // Depend on the bookId prop

  return (
    <div>
      <h2>Comments</h2>
      {/* Render comments */}
      {comments.map(comment => (
        <div
          key={comment._id}
          style={{
            display: 'flex',
            marginBottom: '20px',
            backgroundColor: '#f0f0f0', // Example background color for comment
          }}
          className="comment-container"
        >
          <div
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '20px',
              marginBottom: '5px',
              color: 'black',
              fontFamily: 'Tahoma, sans-serif', // Example font family
            }}
            className="comment"
          >
            {comment.text}
          </div>
          <div
            style={{
              flex: 1,
              padding: '10px',
              fontStyle: 'italic',
              color: 'black',
              backgroundColor: '#e0e0e0', // Example background color for poster
            }}
            className="poster"
          >
            Posted by: {comment.author}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
