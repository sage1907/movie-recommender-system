import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../../css/Favorites.css';
import CategorySection from '../HomePage/CategorySection';
import ShowCard from '../HomePage/ShowCard';
import Sidebar from '../Sidebar/Sidebar';
import { fetchFavoritesAction } from '../../redux/slices/users/favoriteslistSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const [favlist, setFavlist] = useState([]);

  useEffect(() => {
    dispatch(fetchFavoritesAction())
    .then((response) => {
      setFavlist(response.payload);
    })
    .catch((error) => {
      console.error('Error fetching watchlist:', error);
    });
  }, [dispatch]);

  return (
    <div className="favorites">
    <Sidebar />
    <div className="favorites-content"></div>
      <h1>find all your curated favorites here</h1>
      <CategorySection title="your favorites">
          {favlist.map((show, index) => (
              <ShowCard key={index} show={show._id}/>
          ))}
      </CategorySection>
    </div>
  );
};

export default Favorites;
