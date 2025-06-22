const express = require('express');
const aiService = require('../services/aiService');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get AI-generated study schedule
router.get('/schedule', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const tasks = await Task.find({ 
      userId: req.userId, 
      status: { $in: ['pending', 'in-progress'] }
    });

    const schedule = aiService.generateStudySchedule(user, tasks);
    res.json({ schedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get personalized study tips
router.get('/tips', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const recentTasks = await Task.find({ 
      userId: req.userId,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    const tips = aiService.getPersonalizedTips(user, recentTasks);
    res.json({ tips });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Analyze task and get AI suggestions
router.post('/analyze-task', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const analysis = aiService.analyzeTaskContent(title, description);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get task recommendations
router.get('/recommendations/:taskId', auth, async (req, res) => {
  try {
    const currentTask = await Task.findById(req.params.taskId);
    const allTasks = await Task.find({ userId: req.userId });
    
    const recommendations = aiService.getRecommendations(currentTask, allTasks);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 