import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  if (!tasks.length) {
    return <div className="task-list">No tasks found.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className="task-item">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggleComplete(task)}
          />
          <div className="task-content">
            <div className="task-title">{task.title}</div>
            <div className="task-meta">
              <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              {task.courseName && <span>Course: {task.courseName}</span>}
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => onEdit(task)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 