import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/UserSpace.css';
import Sidebar from './Sidebar';
import CategorySection from '../HomePage/CategorySection';
import ShowCard from '../HomePage/ShowCard';
import { getUserProfileAction } from '../../redux/slices/users/usersSlice';
import { fetchWatchlistAction } from '../../redux/slices/users/watchlistSlice';
import moment from 'moment';

const UserSpace = () => {
    const dispatch = useDispatch();
    const [watchlist, setWatchlist] = useState([]);
    const [continueWatching, setContinueWatching] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('userInfo');
      navigate('/login');
      window.location.reload();
    }

    const handleSettings = () => {
      navigate('/settings');
    }
  
    useEffect(() => {
      // Simulate fetching user data
      dispatch(getUserProfileAction());
      dispatch(fetchWatchlistAction())
      .then((response) => {
        console.log(response);
        setWatchlist(response.payload); // Assuming response.data is an array of watchlist items
      })
      .catch((error) => {
        console.error('Error fetching watchlist:', error);
      });

      const fetchedContinueWatching = [
        { id: 3, title: 'Stranger Things', image: 'https://upload.wikimedia.org/wikipedia/en/7/78/Stranger_Things_season_4.jpg' },
        { id: 4, title: 'Money Heist', image: 'https://m.media-amazon.com/images/I/91fNL3q0hYS.jpg' },
      ];
      setContinueWatching(fetchedContinueWatching);
    }, [dispatch]);

    const { profile } = useSelector((state) => state?.users);
  
    return (
      <div className="userspace">
      <Sidebar />
        <div className="profile-management">
            <div className="profile-section">
            <img src="" alt="Profile" className="profile-pic" />
            <i className="fa fa-user" ></i>
            <h2>{profile?.name}</h2>
            <p>{profile?.email}</p>
            <p>Joined {moment(profile?.createdAt).fromNow()}</p>
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
                    <ShowCard key={index} show={show._id} />
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