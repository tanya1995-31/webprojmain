import React from 'react';

const SearchBar = ({ search, setSearch }) => {

  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
              id='search'
              type='text'
              role='searchbox'
              placeholder='Search Books...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
        <button type="submit" className="searchButton">Search</button>
        </div>
    </form> 
  );
};

export default SearchBar;
