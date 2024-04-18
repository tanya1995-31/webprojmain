import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../context/AuthProvider";
import Header from './Header';
import SecondHeader from './SecondHeader';
import Select from 'react-select';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Profile = ({ isDarkMode }) => {
  
  const { auth, checkLoginStatus, updateFavoriteBooks } = useContext(AuthContext);
  const [favoriteSubjects, setFavoriteSubjects] = useState([]);
  const [initialFavoriteSubjects, setInitialFavoriteSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); // Track selected book
  const [favoriteBooks, setFavoriteBooks] = useState(auth?.favoriteBooks || []); // Track favorite books
  const navigate = useNavigate(); // Initialize navigate function

  const [availableSubjects] = useState([
    { label: 'Romance', value: 'Romance' },
    { label: 'Love', value: 'Love' },
    { label: 'Kids', value: 'Kids' },
    { label: 'Fantasy', value: 'Fantasy' },
    { label: 'Magic', value: 'Magic' },
    { label: 'Historical Fiction', value: 'Historical Fiction' },
    { label: 'Mystery and detective stories', value: 'Mystery and detective stories' },
    { label: 'Horror', value: 'Horror' },
  ]);

  useEffect(() => {
    // This will update the local state when the global state changes
    if (auth?.favoriteBooks) {
      setFavoriteBooks(auth.favoriteBooks);
    }
    if (auth?.favoriteSubjects) {
      setFavoriteSubjects(auth.favoriteSubjects);
    }
  }, [auth]); // We re-run this effect if the `auth` object changes
  

  const handleSubjectChange = (selectedOptions) => {
    setFavoriteSubjects(selectedOptions.map(option => option.value));
  };

  const handleSaveSubjects = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/update-favorite-subjects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjects: favoriteSubjects }),
        credentials: 'include', // This is important to include the session cookie
      });
      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        updateFavoriteBooks(data.favoriteBooks); // Update global context
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Failed to update favorite subjects:', error);
      setSuccessMessage('Failed to update favorite subjects. Please try again.');
    }
  };

  const removeBookFromFavorites = async (bookId) => {
    try {
        const response = await fetch(`/api/remove-favorite-book/${bookId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: auth._id }),
            credentials: 'include',
        });
        if (response.ok) {
            const updatedFavorites = favoriteBooks.filter(book => book.id !== bookId);
            setFavoriteBooks(updatedFavorites);
            updateFavoriteBooks(updatedFavorites); // Update global context
            console.log('Book removed from favorites:', bookId);
        }
    } catch (error) {
        console.error('Failed to remove favorite book:', error);
    }
};

  if (!auth) {
    return <div>Please log in to view this page.</div>;
  }

  const { username, email } = auth; 
  const isFavoriteSubjectsChanged = JSON.stringify(favoriteSubjects) !== JSON.stringify(initialFavoriteSubjects);  // Check if there are any changes in favoriteSubjects
  const saveButtonDisabled = !isFavoriteSubjectsChanged;  // Disable button if no changes made

  // Function to handle selecting a book
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    navigate(`/books/${book.id}`); // Navigate to the book ID page
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
      <Header header='Profile' isDarkMode={isDarkMode} />
      <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-2xl p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <p className="text-lg"><strong>Username:</strong> {username}</p>
          <p className="text-lg"><strong>Email:</strong> {email}</p>
          <div>
            <h2 className="text-lg mb-2"><strong>Favorite Subjects:</strong></h2>
            <Select
              isMulti
              value={availableSubjects.filter(option => favoriteSubjects.includes(option.value))}
              onChange={handleSubjectChange}
              options={availableSubjects}
            />
            <button 
              onClick={handleSaveSubjects} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              disabled={saveButtonDisabled}
            >
              Save Favorite Subjects
            </button>
            {successMessage && <p className="text-green-600">{successMessage}</p>}
          </div>
          <div className="text-lg mt-4">
            <strong>Favorite Books:</strong>
            <div className="flex flex-col gap-4 mt-2">
              {favoriteBooks && favoriteBooks.length > 0 ? (
                favoriteBooks.map(book => (
                  <div key={book._id} className="border p-2 rounded flex items-center">
                    <div onClick={() => handleBookSelect(book)}>
                      {book.title} by {book.author}
                    </div>
                    <button 
                      onClick={() => removeBookFromFavorites(book.id)} 
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {/* Change View Book to a button */}
                    <button 
                      onClick={() => handleBookSelect(book)} 
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                    >
                      View Book
                    </button>
                  </div>
                ))
              ) : (
                <p>No favorite books added.</p>
              )}
            </div>
            {selectedBook && (
              <div className="mt-4">
                <img src={selectedBook.coverImageUrl} alt={selectedBook.title} className="w-16 h-24 object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;