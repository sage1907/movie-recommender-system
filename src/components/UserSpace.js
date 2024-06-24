import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserSpace.css';
import Sidebar from './Sidebar';
import CategorySection from './CategorySection';
import ShowCard from './ShowCard';
import { useWatchlist } from './WatchlistContext';

const UserSpace = () => {
    const [user, setUser] = useState({});
    const { watchlist } = useWatchlist();
    const [continueWatching, setContinueWatching] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate('/login');
    }

    const handleSettings = () => {
      navigate('/settings');
    }
  
    useEffect(() => {
      // Simulate fetching user data
      const fetchedUser = {
        name: 'Flamingo Mingo',
        email: 'flamingo.mingo@gmail.com',
        profilePic: '../images/boy.png'
      };
      setUser(fetchedUser);
  
      // Simulate fetching watchlist and continue watching data
      // const fetchedWatchlist = [
      //   { id: 1, title: 'Mirzapur', image: 'https://m.media-amazon.com/images/M/MV5BMWUyYWNiODItNjdmNS00ZDhlLWE0YjQtNGEyMDg3ODJiMTM3XkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg' },
      //   { id: 2, title: 'Panchayat', image: 'https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_FMjpg_UX1000_.jpg' },
      //   { id: 1, title: 'Mirzapur', image: 'https://m.media-amazon.com/images/M/MV5BMWUyYWNiODItNjdmNS00ZDhlLWE0YjQtNGEyMDg3ODJiMTM3XkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg' },
      //   { id: 2, title: 'Panchayat', image: 'https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_FMjpg_UX1000_.jpg' },
      //   { id: 1, title: 'Mirzapur', image: 'https://m.media-amazon.com/images/M/MV5BMWUyYWNiODItNjdmNS00ZDhlLWE0YjQtNGEyMDg3ODJiMTM3XkEyXkFqcGdeQXVyODQ5NDUwMDk@._V1_.jpg' },
      //   { id: 2, title: 'Panchayat', image: 'https://m.media-amazon.com/images/M/MV5BOGRmMjc4MjEtM2E4YS00NjM5LWIwYzUtYTFlNTdhMTRhNmJjXkEyXkFqcGdeQXVyMTExMTIzMTA5._V1_FMjpg_UX1000_.jpg' },
      // ];
      // setWatchlist(fetchedWatchlist);
  
      const fetchedContinueWatching = [
        { id: 3, title: 'Stranger Things', image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg' },
        { id: 4, title: 'Money Heist', image: 'https://m.media-amazon.com/images/I/91fNL3q0hYS.jpg' },
      ];
      setContinueWatching(fetchedContinueWatching);
    }, []);
  
    return (
      <div className="userspace">
      <Sidebar />
        <div className="profile-management">
            <div className="profile-section">
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            </div>
            <div className="actions">
            <button className="logout-button-1" onClick={handleLogout} >Log Out</button>
            <button className="help-settings-button" onClick={handleSettings} >Settings</button>
            </div>
        </div>
        
        <div className="sections">
          <div className="watchlist-section">
            <CategorySection title="Watchlist">
                {watchlist.map((show, index) => (
                    <ShowCard key={index} show={show}/>
                ))}
            </CategorySection>
          </div>
          
          <div className="continue-watching-section">
            <CategorySection title="Continue watching">
                {continueWatching.map((show, index) => (
                    <ShowCard key={index} show={show}/>
                ))}
            </CategorySection>
          </div>
        </div>
  
                
      </div>
    );
  };
  
  export default UserSpace;