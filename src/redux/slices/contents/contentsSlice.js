import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial state
const initialState = {
  contentList: [],
  contentDetails: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Fetch content details action
export const fetchContentDetailsAction = createAsyncThunk(
  "content/details",
  async (contentId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/contents/view/${contentId}`, config);
      return data.data; // Adjust based on your actual response structure
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch content list action
export const fetchContentListAction = createAsyncThunk(
  "content/list",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/contents/view`, config);
      return data.data; // Adjust based on your actual response structure
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Content slice
const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: (builder) => {
    // Fetch content details
    builder.addCase(fetchContentDetailsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContentDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.contentDetails = action.payload;
    });
    builder.addCase(fetchContentDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch content list
    builder.addCase(fetchContentListAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchContentListAction.fulfilled, (state, action) => {
      state.loading = false;
      state.contentList = action.payload;
    });
    builder.addCase(fetchContentListAction.rejected, (state, action) => {
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
      state.isUpdated = false;
      state.isDeleted = false;
    });
  },
});

// Generate the reducer
const contentReducer = contentSlice.reducer;

export default contentReducer;