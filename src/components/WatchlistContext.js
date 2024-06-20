import React, { createContext, useReducer, useContext } from 'react';

const WatchlistContext = createContext();

const watchlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return [...state, action.payload];
    case 'REMOVE_FROM_WATCHLIST':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, dispatch] = useReducer(watchlistReducer, []);

  return (
    <WatchlistContext.Provider value={{ watchlist, dispatch }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
