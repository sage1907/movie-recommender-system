import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial state
const initialState = {
  favorites: [], // Ensure this array is initialized properly
  loading: false,
  error: null,
};

// Async thunk to add to watchlist
export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${baseURL}/clients/favlist/${contentId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove from watchlist
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${baseURL}/clients/favlist/${contentId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch favorites action
export const fetchFavoritesAction = createAsyncThunk(
  "favorites/list",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/favlist`, config);
      return data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload); // Ensure state.favorites is properly initialized
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch favorites
    builder.addCase(fetchFavoritesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    });
    builder.addCase(fetchFavoritesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Reset error
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });

    // Reset success
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
      state.isRemoved = false;
    });
  },
});

const favlistReducer = favoritesSlice.reducer;

export default favlistReducer;
