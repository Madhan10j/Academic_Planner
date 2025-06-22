import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../store/slices/taskSlice';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import Modal from '../components/UI/Modal';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    course: 'all',
    sortBy: 'dueDate'
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = (taskData) => {
    dispatch(createTask(taskData));
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    dispatch(updateTask({ id: editingTask._id, ...taskData }));
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(taskId));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.course !== 'all' && task.courseName !== filters.course) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'dueDate':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tasks-page">
      <div className="tasks-content">
        <div className="page-header">
          <h1>My Tasks</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowTaskForm(true)}
          >
            + Add Task
          </button>
        </div>

        <TaskFilters filters={filters} setFilters={setFilters} />

        <TaskList 
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onToggleComplete={(task) => 
            dispatch(updateTask({ 
              id: task._id, 
              status: task.status === 'completed' ? 'pending' : 'completed',
              type: task.type
            }))
          }
        />

        <Modal 
          isOpen={showTaskForm} 
          onClose={() => setShowTaskForm(false)}
          title="Create New Task"
        >
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowTaskForm(false)} />
        </Modal>

        <Modal 
          isOpen={!!editingTask} 
          onClose={() => setEditingTask(null)}
          title="Edit Task"
        >
          <TaskForm 
            task={editingTask}
            onSubmit={handleUpdateTask} 
            onCancel={() => setEditingTask(null)} 
          />
        </Modal>
      </div>
    </div>
  );
};

export default Tasks; 