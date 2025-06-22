import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAITips = createAsyncThunk(
  'ai/fetchAITips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/ai/tips');
      return response.data.tips;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch AI tips');
    }
  }
);

export const analyzeTask = createAsyncThunk(
  'ai/analyzeTask',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await api.post('/ai/analyze-task', { title, description });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to analyze task');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    tips: [],
    loading: false,
    error: null,
    analysis: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAITips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAITips.fulfilled, (state, action) => {
        state.loading = false;
        state.tips = action.payload;
      })
      .addCase(fetchAITips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(analyzeTask.fulfilled, (state, action) => {
        state.analysis = action.payload;
      });
  },
});

export default aiSlice.reducer; 