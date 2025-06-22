import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';
import timetableSlice from './slices/timetableSlice';
import aiSlice from './slices/aiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: taskSlice,
    timetable: timetableSlice,
    ai: aiSlice,
  },
}); 