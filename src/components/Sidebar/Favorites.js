import React from 'react';
import { useFavorites } from '../FavoritesContext';
import '../../css/Favorites.css';
import CategorySection from '../HomePage/CategorySection';
import ShowCard from '../HomePage/ShowCard';
import Sidebar from '../Sidebar/Sidebar';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
    <Sidebar />
    <div className="favorites-content"></div>
      <h1>find all your curated favorites here</h1>
      <CategorySection title="your favorites">
          {favorites.map((show, index) => (
              <ShowCard key={index} show={show}/>
          ))}
      </CategorySection>
    </div>
  );
};

export default Favorites;
