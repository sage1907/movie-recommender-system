import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="../images/jps_01.jpg" alt="Logo" />
      </div>
      <div className="subscribe">
        <Link to="/subscribe">subscribe</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/userspace">
              <i className="fas fa-circle-user fa-sm"></i>
              <span className="icon-name">My Space</span>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <i className="fas fa-search fa-sm"></i>
              <span className="icon-name">Search</span>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <i className="fas fa-home fa-sm"></i>
              <span className="icon-name">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/live">
              <i className="fas fa-tv fa-sm"></i>
              <span className="icon-name">Live</span>
            </Link>
          </li>
          <li>
            <Link to="/sports">
              <i className="fas fa-table-tennis fa-sm"></i>
              <span className="icon-name">Sports</span>
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <i className="fas fa-bookmark fa-sm"></i>
              <span className="icon-name">Favorites</span>
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <i className="fas fa-boxes-packing fa-sm"></i>
              <span className="icon-name">Categories</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

