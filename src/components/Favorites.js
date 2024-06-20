import React from 'react';
import { useFavorites } from './FavoritesContext';
import '../css/Favorites.css';
import CategorySection from './CategorySection';
import ShowCard from './ShowCard';
import Sidebar from './Sidebar';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
    <Sidebar />
    <div className="favorites-content"></div>
      <h1>your curated favorites</h1>
      <CategorySection title="your favorites">
          {favorites.map((show, index) => (
              <ShowCard key={index} show={show}/>
          ))}
      </CategorySection>
    </div>
  );
};

export default Favorites;
