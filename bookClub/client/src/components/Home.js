import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SecondHeader from './SecondHeader';
import SearchBar from './SearchBar';

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

  const ViewBooks = (book) => {
    navigate(`/books/${encodeURIComponent(book.title)}/${encodeURIComponent(book.author)}/${encodeURIComponent(book.imgSrc)}`);
  };  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 bg-cover" style={{ backgroundImage: "url('backgrounddddd.jpeg')" }}>
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
  
        {/* Display the subjects and their books */}
        {subjects.map(subject => (
          <div key={subject} className="subject-section">
            {/* Display the section header based on search results */}
            {searchInitiated && booksDataBySubject[subject].length > 0 ? (
              <h2 className="text-2xl font-bold mb-4">Search Results for {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
            ) : (
              <h2 className="text-2xl font-bold mb-4">Books of {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
            )}
  
            <div className="subject-container flex overflow-x-auto space-x-4">
              {/* Display books depending on whether we have search results */}
              {(searchInitiated ? booksDataBySubject[subject] : booksDataBySubject[subject]).map((book, index) => (
                <div key={index} className="book flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                  <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 mb-2 object-cover" />
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm">{book.author}</p>
                  <button onClick={() => ViewBooks(book)} className="view-book-button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
                    View Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
