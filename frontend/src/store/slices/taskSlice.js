import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import api from '../../services/api';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', taskData);
      
      // Show notification for study sessions
      if (taskData.type === 'study') {
        const hours = taskData.estimatedHours || 1;
        toast.success(`📚 New study session created! Estimated ${hours} hour${hours > 1 ? 's' : ''}.`);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...taskData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      
      // If this is a study session being completed, refresh user data to update study hours
      if (taskData.status === 'completed' && taskData.type === 'study') {
        // Show success notification
        const hours = taskData.actualHours || taskData.estimatedHours || 1;
        toast.success(`🎉 Study session completed! +${hours} hour${hours > 1 ? 's' : ''} added to your total.`);
        
        // Dispatch loadUser to refresh user statistics
        dispatch({ type: 'auth/loadUser/pending' });
        try {
          const userResponse = await api.get('/users/profile');
          dispatch({ type: 'auth/loadUser/fulfilled', payload: userResponse.data });
        } catch (userError) {
          console.error('Failed to refresh user data:', userError);
        }
      } else if (taskData.status === 'pending' && taskData.type === 'study') {
        // Show notification when study session is unmarked as completed
        toast('📝 Study session marked as pending', { icon: '📝' });
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks || action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload.task || action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updated = action.payload.task || action.payload;
        state.tasks = state.tasks.map(task => task._id === updated._id ? updated : task);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer; 