import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SecondHeader from './SecondHeader';
import SearchBar from './SearchBar';

const Home = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
    try {
      const response = await axios.get(`http://localhost:5000/api/search-books?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search books:', error);
    }
  };

  const redirectToDiscussion = (book) => {
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

        {searchResults.length > 0 ? (
          <div className="results-container">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {searchResults.map((book, index) => (
              <div key={index} className="book flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 mb-2 object-cover" />
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm">{book.author}</p>
                <button onClick={() => redirectToDiscussion(book)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
                  View Book
                </button>
              </div>
            ))}
          </div>
        ) : (
          subjects.map(subject => (
            <div key={subject}>
              <h2 className="text-2xl font-bold mb-4">Books of {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
              <div className="subject-container flex overflow-x-auto space-x-4">
                {booksDataBySubject[subject].map((book, index) => (
                  <div key={index} className="book flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                    <img src={book.coverImageUrl} alt={book.title} className="w-full h-48 mb-2 object-cover" />
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm">{book.author}</p>
                    <button onClick={() => redirectToDiscussion(book)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
                      View Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
