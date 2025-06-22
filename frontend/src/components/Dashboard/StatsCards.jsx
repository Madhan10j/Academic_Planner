import React from 'react';
import { useSelector } from 'react-redux';

const StatsCards = () => {
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && new Date(task.dueDate) < new Date()
  ).length;

  const stats = [
    {
      title: 'Total Study Hours',
      value: user?.statistics?.totalStudyHours || 0,
      icon: '📚',
      color: 'blue'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: '⏳',
      color: 'orange'
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks,
      icon: '🚨',
      color: 'red'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards; 