import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', { credentials: 'include' });
  
        if (!response.ok) {
          // handle the response error
          throw new Error('Profile fetch failed with status ' + response.status);
        }
  
        // Check if the response's content type is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
  
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        // Here we can check what type of error happened
        if (error instanceof TypeError) {
          // This means that the response wasn't of type 'application/json'
          setError('Received non-JSON response from the server');
        } else {
          // This means there was an issue with the network request itself
          setError('Failed to load profile');
        }
        console.error('Error during fetch profile:', error);
      }
    };
  
    fetchProfile();
  }, []);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="mt-5">
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <div>
          <h2 className="text-lg font-semibold mt-4 mb-2">Favorite Books:</h2>
          <ul>
            {profile.favoriteBooks.map(book => (
              <li key={book._id}>{book.title} by {book.author}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
