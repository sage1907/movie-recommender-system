// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import SignUp from './SignUp';
import Details from './Details';
import UserSpace from './UserSpace';
import Search from './Search';
import Live from './Live';
import Sports from './Sports';
import Favorites from './Favorites';
import Categories from './Categories';
import Sidebar from './Sidebar';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <div>
      <Sidebar />
        <div>
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/userspace" element={<UserSpace />} />
              <Route path="/search" element={<Search />} />
              <Route path="/home" element={<Home />} />
              <Route path="/details/:id" element={<Details />}/>
              <Route path="/live" element={<Live />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;