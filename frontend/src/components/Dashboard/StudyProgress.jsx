import React from 'react';
import { useSelector } from 'react-redux';

const StudyProgress = () => {
  const { user } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.tasks);
  
  // Get study-related tasks
  const studyTasks = tasks.filter(task => task.type === 'study');
  const completedStudyTasks = studyTasks.filter(task => task.status === 'completed');
  
  // Calculate study hours
  const totalStudyHours = user?.statistics?.totalStudyHours || 0;
  const completedTasks = user?.statistics?.completedTasks || 0;
  
  // Calculate weekly goal (assuming 20 hours per week as default)
  const weeklyGoal = 20;
  const weeklyProgress = Math.min((totalStudyHours % weeklyGoal) / weeklyGoal * 100, 100);
  
  // Calculate this week's hours (simplified - in a real app you'd track weekly hours separately)
  const thisWeekHours = totalStudyHours % weeklyGoal || 0;

  return (
    <div className="study-progress">
      <h4>Study Progress</h4>
      
      <div className="study-stats">
        <div className="stat-item">
          <div className="stat-value">{totalStudyHours.toFixed(1)}</div>
          <div className="stat-label">Total Study Hours</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{completedStudyTasks.length}</div>
          <div className="stat-label">Study Sessions</div>
        </div>
      </div>
      
      <div className="weekly-progress">
        <div className="progress-header">
          <span>This Week</span>
          <span>{thisWeekHours.toFixed(1)} / {weeklyGoal}h</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${weeklyProgress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="study-summary">
        <div className="summary-item">
          <span className="summary-label">Completed Sessions:</span>
          <span className="summary-value">{completedStudyTasks.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Pending Sessions:</span>
          <span className="summary-value">{studyTasks.length - completedStudyTasks.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StudyProgress; 