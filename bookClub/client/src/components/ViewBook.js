import React from 'react';
import { useParams } from 'react-router-dom';

const ViewBook = () => {
  const { title, author, imgSrc } = useParams(); // Use React Router's useParams hook to get URL parameters.

  return (
    <div>
      <h1>{decodeURIComponent(title)}</h1>
      <h2>{decodeURIComponent(author)}</h2>
      <img src={decodeURIComponent(imgSrc)} alt={`Cover of ${title}`} />
      {/* Add more book details and discussion group content here */}
    </div>
  );
};

export default ViewBook;
