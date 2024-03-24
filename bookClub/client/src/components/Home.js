import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SecondHeader from './SecondHeader';
import SearchBar from './SearchBar';

import MyCarousel from './MyCarousel';

const Home = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false); 

  const [booksDataBySubject, setBooksDataBySubject] = useState({ love: [], kids: [], fantasy: [] });

  const subjects = ['love', 'kids', 'fantasy'];

  const navigate = useNavigate();

  useEffect(() => {
    subjects.forEach(subject => fetchBooksAndStoreData(subject));
  }, []);

  const fetchBooksAndStoreData = async (subject) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books?subject=${subject}`);
      const books = response.data;
      setBooksDataBySubject(prevState => ({ ...prevState, [subject]: books }));
    } catch (error) {
      console.error(`Failed to fetch books for ${subject}:`, error);
    }
  };

  const handleSearch = async (query) => {
    // Trim the query to remove unnecessary whitespace
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      // If the search query is empty, reset the search results and don't indicate a search has been initiated
      setSearchResults([]);
      setSearchInitiated(false); // Reset search initiated flag
      // Optionally, you could re-fetch the full books list again or restore it from a cached state
      return;
    }

    // If the query is not empty, perform the search
    try {
      const response = await axios.get(`http://localhost:5000/api/search-books?query=${trimmedQuery}`);
      const results = response.data;

      if (results.length === 0) {
        // If there are no results, set the search initiated flag but do not clear the existing book listings
        setSearchInitiated(true);
      } else {
        // If there are results, categorize them by subject and update the UI
        const updatedBooksDataBySubject = subjects.reduce((acc, subject) => {
          acc[subject] = results.filter(book => book.subject.toLowerCase() === subject.toLowerCase());
          return acc;
        }, {});

        // Update the state with the categorized search results
        setBooksDataBySubject(updatedBooksDataBySubject);
        // Set the search results for potential use in displaying "Search Results for {subjectName}"
        setSearchResults(results);
        // Set the search initiated flag to true
        setSearchInitiated(true);
      }
    } catch (error) {
      console.error('Failed to search books:', error);
      // Even in the case of an error, you might want to set the search initiated to true
      setSearchInitiated(true);
    }
  };

  const ViewBooks = (bookId) => {
    navigate(`/books/${bookId}`);
  };  

  const renderBookItem = (book) => {
    return (
      // Use responsive classes for padding and margin (e.g., p-4 md:p-6)
      <div key={book._id} className="book flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-lg shadow-md">
        {/* Responsive image classes */}
        <img src={book.coverImageUrl} alt={book.title} className="w-full h-auto md:h-80 object-cover" />
        {/* Truncate long titles/authors */}
        <h3 className="text-lg font-semibold truncate w-full">{book.title}</h3>
        <p className="text-sm truncate w-full">{book.author}</p>
        {/* Responsive button classes */}
        <button onClick={() => ViewBooks(book._id)} className="view-book-button bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mt-4">
          View Book
        </button>
      </div>
    );
  };
  


  return (
  <div className="min-h-screen bg-cover">
      <Header header='Books Club Web'/>
      <SecondHeader />
      <SearchBar
        search={search}
        setSearch={(value) => {
          setSearch(value); // Set the search state with the new value
          handleSearch(value); // Trigger the search function with the new value
        }}
        onSearch={handleSearch}
      />
  
      {subjects.map(subject => (
        <div key={subject} className="subject-section mb-10">
          <h2 className="text-2xl font-bold mb-4">
            {searchInitiated && searchResults.length > 0 ? `Search Results for "${subject}"` : `Books of ${subject.charAt(0).toUpperCase() + subject.slice(1)}`}
          </h2>
          
          {/* Adjusted MyCarousel to display books in a grid layout */}
          <MyCarousel
            items={booksDataBySubject[subject].map(book => renderBookItem(book))}
          />
        </div>
      ))}
  </div>
);

};

export default Home;
