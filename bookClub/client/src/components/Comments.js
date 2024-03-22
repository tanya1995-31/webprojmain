import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ bookId }) => {
  // State to store comments
  const [comments, setComments] = useState([]);

  // Fetch comments when the component mounts and whenever bookId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [bookId]); // Depend on the bookId prop

  return (
    <div>
      <h2>Comments</h2>
      {/* Render comments */}
      {comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <p>Posted by: {comment.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
