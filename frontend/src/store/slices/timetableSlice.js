import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTimetable = createAsyncThunk(
  'timetable/fetchTimetable',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/timetable');
      return response.data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch timetable');
    }
  }
);

export const addEvent = createAsyncThunk(
  'timetable/addEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post('/timetable', eventData);
      return response.data.event;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'timetable/updateEvent',
  async ({ id, ...eventData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/timetable/${id}`, eventData);
      return response.data.event;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'timetable/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/timetable/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

const timetableSlice = createSlice({
  name: 'timetable',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimetable.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchTimetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const updated = action.payload;
        state.events = state.events.map(event => event._id === updated._id ? updated : event);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event._id !== action.payload);
      });
  },
});

export default timetableSlice.reducer; 