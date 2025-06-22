import React from 'react';

const TaskFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="task-filters">
      <select name="status" value={filters.status} onChange={handleChange} className="form-select">
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      <select name="priority" value={filters.priority} onChange={handleChange} className="form-select">
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <input
        type="text"
        name="course"
        value={filters.course}
        onChange={handleChange}
        className="form-input"
        placeholder="Filter by course"
      />
      <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="form-select">
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
        <option value="created">Sort by Created</option>
      </select>
    </div>
  );
};

export default TaskFilters; 