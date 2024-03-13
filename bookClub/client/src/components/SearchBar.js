import React from 'react';

const SearchBar = ({ search, setSearch, onSearch  }) => {

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(search); // This function will be passed down from the parent component
  };

  return (
    <form className="searchForm" onSubmit={handleSearch}>
        <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
        />
        <button type="submit" className="searchButton">Search</button>
        </div>
    </form> 
  );
};

export default SearchBar;
