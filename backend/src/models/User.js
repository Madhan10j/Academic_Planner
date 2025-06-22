const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    studentId: String,
    university: String,
    year: String,
    major: String,
    courses: [{
      name: String,
      code: String,
      credits: Number,
      instructor: String
    }],
    studyPreferences: {
      preferredStudyTime: String, // morning, afternoon, evening, night
      sessionDuration: Number, // in minutes
      breakDuration: Number, // in minutes
      difficulty: String, // easy, medium, hard
      learningStyle: String // visual, auditory, kinesthetic, reading
    }
  },
  statistics: {
    totalStudyHours: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    averageGrade: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 