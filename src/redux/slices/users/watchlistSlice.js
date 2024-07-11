import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial state
const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

// Async thunk to add to watchlist
export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${baseURL}/clients/watchlist/${contentId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to remove from watchlist
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${baseURL}/clients/watchlist/${contentId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchWatchlistAction = createAsyncThunk(
  "watchlist/list",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/clients/watchlist`, config);
      return data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist.push(action.payload);
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = state.watchlist.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Fetch wishlist
    builder.addCase(fetchWatchlistAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWatchlistAction.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload;
    });
    builder.addCase(fetchWatchlistAction.rejected, (state, action) => {
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

const watchlistReducer = watchlistSlice.reducer;

export default watchlistReducer;
