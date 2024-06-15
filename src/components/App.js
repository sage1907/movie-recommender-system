// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Home from './Home';
import SignUp from './SignUp';
import Details from './Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;