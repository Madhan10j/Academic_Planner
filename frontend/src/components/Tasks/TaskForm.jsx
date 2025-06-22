import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { analyzeTask } from '../../store/slices/aiSlice';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'assignment',
    courseName: '',
    priority: 'medium',
    dueDate: '',
    estimatedHours: 1,
    tags: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        type: task.type || 'assignment',
        courseName: task.courseName || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        estimatedHours: task.estimatedHours || 1,
        tags: task.tags?.join(', ') || ''
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAIAnalysis = async () => {
    if (formData.title && formData.description) {
      try {
        const analysis = await dispatch(analyzeTask({
          title: formData.title,
          description: formData.description
        })).unwrap();
        
        setAiSuggestions(analysis);
        setFormData(prev => ({
          ...prev,
          priority: analysis.priority,
          estimatedHours: analysis.estimatedHours
        }));
      } catch (error) {
        console.error('AI analysis failed:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label">Task Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="form-textarea"
          rows="3"
        />
      </div>

      {formData.title && formData.description && (
        <div className="form-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAIAnalysis}
          >
            🤖 Get AI Suggestions
          </button>
          {aiSuggestions && (
            <div className="ai-suggestions">
              <p>✨ AI suggests: Priority <strong>{aiSuggestions.priority}</strong>, 
              Estimated time: <strong>{aiSuggestions.estimatedHours} hours</strong></p>
            </div>
          )}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="assignment">Assignment</option>
            <option value="exam">Exam</option>
            <option value="project">Project</option>
            <option value="study">Study Session</option>
            <option value="reading">Reading</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Course</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., Computer Science 101"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Estimated Hours</label>
          <input
            type="number"
            name="estimatedHours"
            value={formData.estimatedHours}
            onChange={handleInputChange}
            className="form-input"
            min="0.5"
            step="0.5"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Due Date *</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tags</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="form-input"
          placeholder="homework, research, presentation (comma-separated)"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 