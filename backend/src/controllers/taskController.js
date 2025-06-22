const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // If task is completed and it's a study session, update user's study hours
    if (task.status === 'completed' && task.type === 'study') {
      await updateUserStudyHours(req.userId, task.actualHours || task.estimatedHours);
    }
    
    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

// Helper function to update user's study hours
const updateUserStudyHours = async (userId, hours) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.statistics.totalStudyHours += hours;
      user.statistics.completedTasks += 1;
      await user.save();
    }
  } catch (error) {
    console.error('Error updating user study hours:', error);
  }
}; 