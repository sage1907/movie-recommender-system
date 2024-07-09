import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import '../css/Settings.css';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
      navigate('/login');
      window.location.reload();
  }

  return (
    <div className="settings-page">
      <Sidebar />
      <div className="settings-content">
        <div className="settings-left">
          <h1>Help & Support</h1>
          <div className="left-content">
            <div className="left-content-help">
                <h2>Help Centre</h2>
                <p>Happy to help!</p>
            </div>
            <div className="left-content-feedback">
                <h2>Send us Feedback</h2>
                <p>We would love to hear your suggestions</p>
            </div>
          </div>
        </div>
        <div className="settings-right">
          <h1>Subscription and Devices</h1>
          <div className="right-header">
            <h2>Subscribe to enjoy JPS Streaming</h2>
            <button className="subscribe-button">Subscribe</button>
          </div>
          <div className="subscription-info">
            <p><strong>Registered Mobile Number:</strong></p>
            <p>+91 7********7</p>
            <button className="update-button">Update</button>
          </div>
          <div className="device-info">
            <p><strong>This Device</strong></p>
            <p>web browser</p>
            <p>last used: today</p>
            <button className="logout-button" onClick={handleLogout} >Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
