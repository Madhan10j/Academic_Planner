const natural = require('natural');
const Task = require('../models/Task');
const User = require('../models/User');

class AIService {
  // Analyze task content to suggest priority and time estimation
  analyzeTaskContent(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    const urgentKeywords = ['urgent', 'asap', 'immediate', 'emergency', 'deadline', 'due tomorrow'];
    const highKeywords = ['important', 'exam', 'test', 'presentation', 'project', 'final'];
    const timeKeywords = {
      'short': ['quiz', 'reading', 'review', 'summary'],
      'medium': ['assignment', 'homework', 'essay', 'report'],
      'long': ['project', 'research', 'thesis', 'presentation', 'exam preparation']
    };

    let priority = 'medium';
    let estimatedHours = 2;

    // Priority analysis
    if (urgentKeywords.some(keyword => text.includes(keyword))) {
      priority = 'urgent';
    } else if (highKeywords.some(keyword => text.includes(keyword))) {
      priority = 'high';
    }

    // Time estimation
    if (timeKeywords.short.some(keyword => text.includes(keyword))) {
      estimatedHours = 1;
    } else if (timeKeywords.long.some(keyword => text.includes(keyword))) {
      estimatedHours = 4;
    }

    return { priority, estimatedHours };
  }

  // Generate optimal study schedule based on user preferences
  generateStudySchedule(user, tasks) {
    const { studyPreferences } = user.profile;
    const schedule = [];

    // Sort tasks by priority and due date
    const sortedTasks = tasks.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Generate schedule based on preferences
    sortedTasks.forEach(task => {
      const sessionDuration = studyPreferences.sessionDuration || 60;
      const sessionsNeeded = Math.ceil(task.estimatedHours * 60 / sessionDuration);

      for (let i = 0; i < sessionsNeeded; i++) {
        schedule.push({
          taskId: task._id,
          title: task.title,
          duration: sessionDuration,
          type: 'study',
          priority: task.priority
        });
      }
    });

    return schedule;
  }

  // Get personalized study tips based on user data
  getPersonalizedTips(user, recentTasks) {
    const tips = [];
    const { studyPreferences, statistics } = user;

    // Analyze completion patterns
    const completionRate = statistics.completedTasks / (statistics.completedTasks + recentTasks.length);
    
    if (completionRate < 0.7) {
      tips.push("Try breaking large tasks into smaller, manageable chunks to improve completion rates.");
    }

    // Time management tips
    if (statistics.totalStudyHours < 20) {
      tips.push("Consider implementing the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break.");
    }

    // Learning style tips
    switch (studyPreferences?.learningStyle) {
      case 'visual':
        tips.push("Create mind maps and diagrams to visualize complex concepts.");
        break;
      case 'auditory':
        tips.push("Try recording yourself explaining concepts and listen back to reinforce learning.");
        break;
      case 'kinesthetic':
        tips.push("Use hands-on activities and take frequent breaks to move around while studying.");
        break;
      case 'reading':
        tips.push("Create detailed notes and summaries, and read them multiple times for better retention.");
        break;
    }

    // Priority-based tips
    const urgentTasks = recentTasks.filter(task => task.priority === 'urgent').length;
    if (urgentTasks > 3) {
      tips.push("You have several urgent tasks. Consider delegating or seeking help where possible.");
    }

    return tips;
  }

  // Recommend similar tasks or study materials
  getRecommendations(currentTask, allTasks) {
    const currentText = `${currentTask.title} ${currentTask.description}`.toLowerCase();
    const recommendations = [];

    allTasks.forEach(task => {
      if (task._id.toString() !== currentTask._id.toString()) {
        const taskText = `${task.title} ${task.description}`.toLowerCase();
        const similarity = natural.JaroWinklerDistance(currentText, taskText);
        
        if (similarity > 0.3) {
          recommendations.push({
            task: task,
            similarity: similarity
          });
        }
      }
    });

    return recommendations
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(rec => rec.task);
  }
}

module.exports = new AIService(); 