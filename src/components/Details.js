// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Sidebar from './Sidebar/Sidebar';
// import { useWatchlist } from './WatchlistContext';
// import { useFavorites } from './FavoritesContext';
// import baseURL from '../redux/utils/baseURL';
// import '../css/Details.css';

// const Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [showDetails, setShowDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { watchlist, dispatch: watchlistDispatch } = useWatchlist();
//   const { favorites, dispatch: favoritesDispatch } = useFavorites();
//   const [isInWatchlist, setIsInWatchlist] = useState(false);
//   const [isInFavorites, setIsInFavorites] = useState(false);

//   const toggleFavorite = () => {
//     if (isInFavorites) {
//       favoritesDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: showDetails });
//     } else {
//       favoritesDispatch({ type: 'ADD_TO_FAVORITES', payload: showDetails });
//     }
//     setIsInFavorites(!isInFavorites);
//   };

//   const toggleWatchlist = () => {
//     if (isInWatchlist) {
//       watchlistDispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: showDetails });
//     } else {
//       watchlistDispatch({ type: 'ADD_TO_WATCHLIST', payload: showDetails });
//     }
//     setIsInWatchlist(!isInWatchlist);
//   };

//   useEffect(() => {
//     const fetchShowDetails = async () => {
//       try {
//         const response = await fetch(`${baseURL}/contents/view/${id}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust if you use a different way of handling auth
//           }
//         });
//         const data = await response.json();
//         setShowDetails(data.data);
//         setLoading(false);

//         // check if the item is already in watchlist
//         setIsInWatchlist(watchlist.some(item => item.id === data.id));
//         setIsInFavorites(favorites.some(item => item.id === data.id));
//       } catch (error) {
//         console.error('Error fetching show details:', error);
//         setLoading(false);
//       }
//     };

//     fetchShowDetails();
//   }, [id, watchlist, favorites]);

//   useEffect(() => {
//     if (showDetails) {
//       setIsInWatchlist(watchlist.some(item => item.id === showDetails.id));
//       setIsInFavorites(favorites.some(item => item.id === showDetails.id));
//     }
//   }, [watchlist, favorites, showDetails]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!showDetails) {
//     return <div>Error: Show details not found</div>;
//   }

//   const handleWatchNow = () => {
//     navigate('/watch', { state: { videoUrl: showDetails.videoUrl, title: showDetails.title } });
//   };

//   return (
//     <div className="details" style={{ backgroundImage: `url(${showDetails.posterUrl})` }}>
//             <div className="details-sidebar">
//                 <Sidebar />
//             </div>
//             <div className="details-content">
//                 <div className="details-info">
//                     <div className="details-title">
//                         <h1>{showDetails.title}</h1>
//                         <i title="Add to favorites"
//                             className={`fa-heart ${isInFavorites ? 'fas' : 'far'} heart-icon`}
//                             onClick={toggleFavorite}
//                         ></i>
//                         <i title="Share"
//                             className="fas fa-share share-icon"
//                         ></i>
//                     </div>
//                     <p>{showDetails.description}</p>
//                     <p>{showDetails.year} • {showDetails.language} • {showDetails.rating} • {showDetails.duration}</p>
//                     <div className="details-genres">
//                         {showDetails.genre.map((tag, index) => (
//                             <span key={index} className="genre">{tag}</span>
//                         ))}
//                     </div>
//                     <button className="watch-button" title="watch now" onClick={handleWatchNow}>
//                       <i className="fas fa-play"></i> Watch Now
//                     </button>
//                     <button className="add-button" title="Add to watchlist" onClick={toggleWatchlist}>
//                       <i className={`fas ${isInWatchlist ? 'fa-check' : 'fa-plus'}`}></i>
//                     </button>
//                 </div>
//             </div>
//         </div>
//   );
// };

// export default Details;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar/Sidebar';
import { fetchContentDetailsAction } from '../redux/slices/contents/contentsSlice';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/users/watchlistSlice';
import '../css/Details.css';
import { addToFavorites, removeFromFavorites } from '../redux/slices/users/favoriteslistSlice';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contentDetails, loading, error } = useSelector((state) => state.content);
  const [showDetails, setShowDetails] = useState(null);
  const { watchlist } = useSelector((state) => state.watchlist);
  // const { favorites } = useSelector((state) => state.favorites.favorites);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const toggleFavorite = () => {
    if (isInFavorites) {
      dispatch(removeFromFavorites(showDetails._id));
    } else {
      dispatch(addToFavorites(showDetails._id));
    }
    setIsInFavorites(!isInFavorites);
  };

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(showDetails._id));
    } else {
      dispatch(addToWatchlist(showDetails._id));
    }
    setIsInWatchlist(!isInWatchlist);
  };

  useEffect(() => {
      dispatch(fetchContentDetailsAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (contentDetails) {
      setShowDetails(contentDetails);
      setIsInWatchlist(watchlist.some((item) => item.id === contentDetails.id));
      // setIsInFavorites(favorites.some((item) => item.id === contentDetails.id));
    }
  }, [contentDetails, watchlist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>Error: Show details not found</div>;
  }

  const handleWatchNow = () => {
    navigate('/watch', { state: { videoUrl: showDetails.videoUrl, title: showDetails.title } });
  };

  return (
    <div className="details" style={{ backgroundImage: `url(${showDetails.posterUrl})` }}>
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
            <i title="Share"
              className="fas fa-share share-icon"
            ></i>
          </div>
          <p> • {showDetails.directorName} • IMDb {showDetails.rating} • {showDetails.duration}</p>
          <p>{showDetails.description}</p>
          <div className="details-genres">
            {showDetails.genre && showDetails.genre.length > 0 ? (
              showDetails.genre.map((tag, index) => (
                <span key={index} className="genre">{tag}</span>
              ))
            ) : (
              <span> </span>
            )}
          </div>
          <button className="watch-button" title="watch now" onClick={handleWatchNow}>
            <i className="fas fa-play"></i> Watch Now
          </button>
          <button className="add-button" title="Add to watchlist" onClick={toggleWatchlist}>
            <i className={`fas ${isInWatchlist ? 'fa-check' : 'fa-plus'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
