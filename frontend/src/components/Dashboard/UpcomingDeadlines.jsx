import React from 'react';
import { useSelector } from 'react-redux';

const UpcomingDeadlines = () => {
  const { tasks } = useSelector(state => state.tasks);
  const now = new Date();
  const upcoming = tasks
    .filter(task => new Date(task.dueDate) > now && task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  if (!upcoming.length) return <div className="task-list">No upcoming deadlines.</div>;

  return (
    <div className="task-list">
      <h4>Upcoming Deadlines</h4>
      {upcoming.map(task => (
        <div key={task._id} className="task-item">
          <div className="task-content">
            <div className="task-title">{task.title}</div>
            <div className="task-meta">
              <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingDeadlines; 