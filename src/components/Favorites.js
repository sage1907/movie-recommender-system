import React from 'react';
import '../css/Favorites.css';
import Sidebar from './Sidebar';

const Favorites = () => {
  return (
    <div className="favorites">
    <Sidebar />
      <h1>Favorites</h1>
      <p>Your favorite movies and shows.</p>
    </div>
  );
};

export default Favorites;
