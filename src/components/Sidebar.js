// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/Sidebar.css';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-logo">
//         <img src="../images/JPS.png" alt="Logo" />
//       </div>
//       <div className="subscribe">
//         <Link to="/subscribe">subscribe</Link>
//       </div>
//       <nav>
//         <ul>
//           <li><Link to="/search"><i className="fas fa-search"></i></Link></li>
//           <li><Link to="/home"><i className="fas fa-home"></i></Link></li>
//           <li><Link to="/live"><i className="fas fa-tv"></i></Link></li>
//           <li><Link to="/favorites"><i className="fas fa-bookmark"></i></Link></li>
//           <li><Link to="/history"><i className="fas fa-history"></i></Link></li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="../images/JPS.png" alt="Logo" />
      </div>
      <div className="subscribe">
        <Link to="/subscribe">subscribe</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/search">
              <i className="fas fa-search"></i>
              <span className="icon-name">Search</span>
            </Link>
          </li>
          <li>
            <Link to="/home">
              <i className="fas fa-home"></i>
              <span className="icon-name">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/live">
              <i className="fas fa-tv"></i>
              <span className="icon-name">Live</span>
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <i className="fas fa-bookmark"></i>
              <span className="icon-name">Favorites</span>
            </Link>
          </li>
          <li>
            <Link to="/history">
              <i className="fas fa-history"></i>
              <span className="icon-name">History</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

