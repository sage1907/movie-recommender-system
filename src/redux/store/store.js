import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import contentReducer from "../slices/contents/contentsSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        content: contentReducer,
    },
});

export default store;