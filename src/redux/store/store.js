import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import contentReducer from "../slices/contents/contentsSlice";
import watchlistReducer from "../slices/users/watchlistSlice";
import favlistReducer from "../slices/users/favoriteslistSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        content: contentReducer,
        watchlist: watchlistReducer,
        favlist: favlistReducer,
    },
});

export default store;