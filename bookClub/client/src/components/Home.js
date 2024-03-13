import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header'
import SecondHeader from './SecondHeader';
import SearchBar from './SearchBar';

const Home = () => {
  const [booksDataBySubject, setBooksDataBySubject] = useState({ love: [], kids: [], fantasy: [] });
  const subjects = ['love', 'kids', 'fantasy'];

  const [search, setSearch] = useState('');

  const fetchBooksAndStoreData = async (subject) => {
    try {
      const url = `https://openlibrary.org/subjects/${subject}.json?limit=15`;
      const response = await axios.get(url);
      const books = response.data.works.map(work => ({
        title: work.title,
        author: work.authors.map(author => author.name).join(', '),
        imgSrc: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : 'path/to/default/image.jpg'
      }));

      // Store the books data for the subject
      setBooksDataBySubject(prevState => ({ ...prevState, [subject]: books }));
    } catch (error) {
      console.error(`Failed to fetch books for ${subject}:`, error);
    }
  };

  useEffect(() => {
    subjects.forEach(subject => fetchBooksAndStoreData(subject));
  }, []);

  const redirectToDiscussion = (book) => {
    window.location.href = `GroupDisscusion.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&imgSrc=${encodeURIComponent(book.imgSrc)}`;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 bg-cover" style={{ backgroundImage: "url('backgrounddddd.jpeg')" }}>
        <Header header='Books Club Web'/>
        <SecondHeader />
        {/* Insert SearchBar component here */}
        <SearchBar 
          search={search} 
          setSearch={setSearch} 
        />
        {subjects.map(subject => (
          <div key={subject}>
            <h2 className="text-2xl font-bold mb-4">Books of {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
            <div className="subject-container flex overflow-x-auto space-x-4">
              {booksDataBySubject[subject].map((book, index) => (
                <div key={index} className="book flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
                  <img src={book.imgSrc} alt={book.title} className="w-full h-48 mb-2 object-cover" />
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm">{book.author}</p>
                  <button onClick={() => redirectToDiscussion(book)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">View Book</button>
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
