import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useWatchlist } from './WatchlistContext';
import { useFavorites } from './FavoritesContext';
import '../css/Details.css';

const Details = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { watchlist, dispatch: watchlistDispatch } = useWatchlist();
  const { favorites, dispatch: favoritesDispatch } = useFavorites();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const toggleFavorite = () => {
    if (isInFavorites) {
      favoritesDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: showDetails });
    } else {
      favoritesDispatch({ type: 'ADD_TO_FAVORITES', payload: showDetails });
    }
    setIsInFavorites(!isInFavorites);
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      watchlistDispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: showDetails });
    } else {
      watchlistDispatch({ type: 'ADD_TO_WATCHLIST', payload: showDetails });
    }
    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`/api/content/${id}`);
        const data = await response.json();
        setShowDetails(data);
        setLoading(false);

        // check if the item is already in watchlist
        setIsInWatchlist(watchlist.some(item => item.id === data.id));
        setIsInFavorites(favorites.some(item => item.id === data.id));
      } catch (error) {
        console.error('Error fetching show details:', error);
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id, watchlist, favorites]);

  useEffect(() => {
    if (showDetails) {
      setIsInWatchlist(watchlist.some(item => item.id === showDetails.id));
      setIsInFavorites(favorites.some(item => item.id === showDetails.id));
    }
  }, [watchlist, favorites, showDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!showDetails) {
    return <div>Error: Show details not found</div>;
  }

  return (
    <div className="details" style={{ backgroundImage: `url(${showDetails.image})` }}>
            <div className="details-sidebar">
                <Sidebar />
            </div>
            <div className="details-content">
                <div className="details-info">
                    <div className="details-title">
                        <h1>{showDetails.title}</h1>
                        <i title="Add to favorites"
                            className={`fa-heart ${isInFavorites ? 'fas' : 'far'} heart-icon`}
                            onClick={toggleFavorite}
                        ></i>
                    </div>
                    <p>{showDetails.year} • {showDetails.language} • {showDetails.rating}</p>
                    <p>{showDetails.description}</p>
                    <div className="details-genres">
                        {showDetails.tags.map((tag, index) => (
                            <span key={index} className="genre">{tag}</span>
                        ))}
                    </div>
                    <button className="subscribe-button"><i className="fas fa-play"></i> Watch Now</button>
                    <button className="add-button" title="Add to watchlist" onClick={toggleWatchlist}>
                      <i className={`fas ${isInWatchlist ? 'fa-check' : 'fa-plus'}`}></i>
                    </button>
                </div>
            </div>
        </div>
  );
};

export default Details;