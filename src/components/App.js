// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { WatchlistProvider } from "./WatchlistContext";
import { FavoritesProvider } from "./FavoritesContext";
import AuthRoute from "./AuthRoute/AuthRoute";
import VideoPlayback from "./VideoPlayer/VideoPlayback";
import LoginPage from "./Users/Forms/LoginPage";
import Home from "./HomePage/Home";
import SignUp from "./Users/Forms/SignUp";
import Details from "./Details";
import UserSpace from "./Sidebar/UserSpace";
import Search from "./Sidebar/Search";
import Live from "./Sidebar/Live";
import Sports from "./Sidebar/Sports";
import Favorites from "./Sidebar/Favorites";
import Categories from "./CategoryPage/Categories";
import Settings from "./Settings";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";

const App = () => {
  const location = useLocation();
  const [showSidebarFooter, setShowSidebarFooter] = useState(false);

  useEffect(() => {
    const noSidebarFooterPaths = ["/", "/login", "/signup"];
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const isLoggedIn = user?.token ? true : false;

    setShowSidebarFooter(
      !noSidebarFooterPaths.includes(location.pathname) && isLoggedIn
    );
  }, [location]);

  return (
    <div>
      {showSidebarFooter && <Sidebar />}
      <div>
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LoginPage />} />

            <Route
              path="/userspace"
              element={
                <AuthRoute>
                  <UserSpace />
                </AuthRoute>
              }
            />
            <Route
              path="/search"
              element={
                <AuthRoute>
                  <Search />
                </AuthRoute>
              }
            />
            <Route
              path="/home"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <AuthRoute>
                  <Details />
                </AuthRoute>
              }
            />
            <Route
              path="/live"
              element={
                <AuthRoute>
                  <Live />
                </AuthRoute>
              }
            />
            <Route
              path="/sports"
              element={
                <AuthRoute>
                  <Sports />
                </AuthRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <AuthRoute>
                  <Favorites />
                </AuthRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <AuthRoute>
                  <Categories />
                </AuthRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthRoute>
                  <Settings />
                </AuthRoute>
              }
            />
            <Route
              path="/watch"
              element={
                <AuthRoute>
                  <VideoPlayback />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
        {showSidebarFooter && <Footer />}
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <WatchlistProvider>
      <FavoritesProvider>
        <Router>
          <App />
        </Router>
      </FavoritesProvider>
    </WatchlistProvider>
  );
};

export default AppWrapper;
