import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial state
const initialState = {
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
  loading: false,
  error: null,
};

// Async thunk to add to favorites
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
      const { data } = await axios.put(`${baseURL}/clients/favlist/${contentId}`, {}, config);
      const updatedFavorites = [...getState().favorites, data];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove from favorites
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
      const { data } = await axios.delete(`${baseURL}/clients/favlist/${contentId}`, config);
      const updatedFavorites = getState().favorites.filter(item => item.id !== contentId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      const { data } = await axios.get(`${baseURL}/clients/favlist`, config);
      localStorage.setItem("favorites", JSON.stringify(data));
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
        state.favorites.push(action.payload);
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

const favoritesReducer = favoritesSlice.reducer;

export default favoritesReducer;