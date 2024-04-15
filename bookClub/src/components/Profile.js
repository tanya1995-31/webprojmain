import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../context/AuthProvider";
import Header from './Header';
import SecondHeader from './SecondHeader';

const ProfilePage = ({ isDarkMode }) => {
  const { auth, checkLoginStatus } = useContext(AuthContext);
  const [favoriteSubjects, setFavoriteSubjects] = useState(auth?.favoriteSubjects || []);
  const [availableSubjects] = useState(['Romance', 'Love', 'Kids', 'Fantasy']); // Use capitalized names if you want them displayed that way
  
  // Trigger a login status check on component mount
  useEffect(() => {
    if (!auth) {
      checkLoginStatus(); // This should set the auth state if the user is logged in
    }
  }, [auth, checkLoginStatus]);

  useEffect(() => {
    // Set the initial favorite subjects from the auth context when it's available
    if (auth?.favoriteSubjects) {
      setFavoriteSubjects(auth.favoriteSubjects);
    }
  }, [auth]);

  // This function will be called when the checkboxes change
  const handleSubjectChange = (subject) => {
    setFavoriteSubjects(prevSubjects =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter(subj => subj !== subject)
        : [...prevSubjects, subject]
    );
  };

  // Call this function when the user saves their favorite subjects
  const saveFavoriteSubjects = async () => {
    try {
      const response = await fetch('/api/user/favoritesubjects', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favoriteSubjects }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Update your context or local state as needed
        console.log(data.message); // Show a success message
      } else {
        throw new Error(data.message); // Error message from server
      }
    } catch (error) {
      console.error('An error occurred while updating favorite subjects:', error);
      // Handle the error, maybe show a message to the user
    }
  };

  if (!auth) {
    // If auth is still not available after the check, you can assume the user is not logged in
    return <div>Please log in to view this page.</div>;
  }

  // Deconstruct only after checking auth is available to avoid undefined errors
  const { username, email, favoriteBooks } = auth;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header header='Profile' isDarkMode={isDarkMode}/>
      <SecondHeader isDarkMode={isDarkMode}/>
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-2xl p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <p className="text-lg"><strong>Username:</strong> {username}</p>
          <p className="text-lg"><strong>Email:</strong> {email}</p>
          <div>
            <h2 className="text-lg mb-2"><strong>Favorite Subjects:</strong></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {availableSubjects.map(subject => (
                <label key={subject} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={favoriteSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                    className="form-checkbox h-5 w-5"
                  />
                  <span className="ml-2 text-lg">{subject}</span>
                </label>
              ))}
            </div>
            <button onClick={saveFavoriteSubjects} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Favorite Subjects</button>
          </div>
          <p className="text-lg mt-4"><strong>Favorite Books:</strong></p>
          <ul className="list-disc ml-8 mb-4">
            {favoriteBooks && favoriteBooks.length > 0 ? (
              favoriteBooks.map(book => (
                <li key={book.id}>{book.title} by {book.author}</li>
              ))
            ) : (
              <li>No favorite books added.</li>
            )}
          </ul>
          {/* Add functionality to update favorite books if needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
