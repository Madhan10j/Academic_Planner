const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config({ path: './config.env' });

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const timetableRoutes = require('./routes/timetable');
const aiRoutes = require('./routes/ai');

const { sendDeadlineReminders } = require('./services/reminderService');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://academic-planner-jlmb.vercel.app', // Vercel frontend
    'http://localhost:5173', // Vite default
    'http://localhost:5174'  // Your current local dev port
  ],
  credentials: true // Only if you use cookies/auth
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/ai', aiRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/academic-planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schedule reminder service to run every hour
cron.schedule('0 * * * *', () => {
  sendDeadlineReminders();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`JWT Secret configured: ${process.env.JWT_SECRET ? 'Yes' : 'No'}`);
}); 