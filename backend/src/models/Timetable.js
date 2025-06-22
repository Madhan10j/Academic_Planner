const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  events: [{
    title: String,
    type: {
      type: String,
      enum: ['class', 'study', 'assignment', 'exam', 'break', 'personal']
    },
    courseId: String,
    courseName: String,
    startTime: Date,
    endTime: Date,
    location: String,
    description: String,
    recurring: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly']
    },
    color: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Timetable', timetableSchema); 