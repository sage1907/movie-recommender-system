import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import contentReducer from "../slices/contents/contentsSlice";
import watchlistReducer from "../slices/users/watchlistSlice";
import favoritesReducer from "../slices/users/favoriteslistSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        content: contentReducer,
        watchlist: watchlistReducer,
        favorites: favoritesReducer,
    },
});

export default store;