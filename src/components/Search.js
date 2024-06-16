import React from 'react';
import '../css/Search.css';
import Sidebar from './Sidebar';

const Search = () => {
  return (
    <div className="search">
    <Sidebar />
      <h1>Search</h1>
      <p>Find your favorite movies and shows.</p>
    </div>
  );
};

export default Search;
