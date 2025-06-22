import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../../store/slices/taskSlice';

const RecentTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const recent = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const handleToggleComplete = (task) => {
    dispatch(updateTask({ 
      id: task._id, 
      status: task.status === 'completed' ? 'pending' : 'completed',
      type: task.type
    }));
  };

  if (!recent.length) return <div className="task-list">No recent tasks.</div>;

  return (
    <div className="task-list">
      <h4>Recent Tasks</h4>
      {recent.map(task => (
        <div key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
          <div className="task-content">
            <div className="task-header">
              <div className="task-title">{task.title}</div>
              {task.type === 'study' && (
                <button 
                  className={`btn btn-sm ${task.status === 'completed' ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.status === 'completed' ? '✓ Completed' : 'Complete'}
                </button>
              )}
            </div>
            <div className="task-meta">
              <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              {task.type === 'study' && task.estimatedHours && (
                <span className="study-hours">{task.estimatedHours}h study session</span>
              )}
            </div>
            {task.status === 'completed' && task.type === 'study' && (
              <div className="task-completion">
                <span className="completion-badge">✓ Study session completed</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentTasks; 