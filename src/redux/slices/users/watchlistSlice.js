import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [],
  loading: false,
  error: null,
};

// Async thunk to add to watchlist
export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const  { data } = await axios.put(`${baseURL}/clients/watchlist/${contentId}`, {}, config);
      const updatedWatchlist = [...getState().watchlist, data];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return data.data;
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
      const response = await axios.delete(`${baseURL}/clients/watchlist/${contentId}`, config);
      const updatedWatchlist = getState().watchlist.filter(item => item.id !== contentId);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
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
      localStorage.setItem("watchlist", JSON.stringify(data));
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
      state.watchlist = action.payload;
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


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import baseURL from "../../utils/baseURL";
// import {
//   resetErrAction,
//   resetSuccessAction,
// } from "../globalActions/globalActions";

// const initialState = {
//   loading: false,
//   error: null,
//   watchlist: localStorage.getItem("watchlist")
//     ? JSON.parse(localStorage.getItem("watchlist"))
//     : [],
// };

// export const addToWatchlist = createAsyncThunk(
//   "watchlist/add",
//   async (contentId, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.token;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.put(`${baseURL}/clients/watchlist/${contentId}`, {}, config);
//       // Update localStorage
//       const updatedWatchlist = [...getState().watchlist.watchlist, data];
//       localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// export const removeFromWatchlist = createAsyncThunk(
//   "watchlist/remove",
//   async (contentId, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.token;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.delete(`${baseURL}/clients/watchlist/${contentId}`, config);
//       // Update localStorage
//       const updatedWatchlist = getState().watchlist.watchlist.filter(item => item.id !== contentId);
//       localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// export const fetchWatchlistAction = createAsyncThunk(
//   "watchlist/fetch",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const token = getState()?.users?.userAuth?.userInfo?.token;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.get(`${baseURL}/clients/watchlist`, config);
//       // Update localStorage
//       localStorage.setItem("watchlist", JSON.stringify(data));
//       return data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

// const watchlistSlice = createSlice({
//   name: "watchlist",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToWatchlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToWatchlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.watchlist.push(action.payload);
//       })
//       .addCase(addToWatchlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeFromWatchlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(removeFromWatchlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.watchlist = state.watchlist.filter(item => item.id !== action.payload.id);
//       })
//       .addCase(removeFromWatchlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchWatchlistAction.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWatchlistAction.fulfilled, (state, action) => {
//         state.loading = false;
//         state.watchlist = action.payload;
//       })
//       .addCase(fetchWatchlistAction.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(resetErrAction.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(resetSuccessAction.pending, (state) => {
//         state.isAdded = false;
//         state.isRemoved = false;
//       });
//   },
// });

// const watchlistReducer = watchlistSlice.reducer;

// export default watchlistReducer;