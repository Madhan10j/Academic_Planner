import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import api from '../services/api';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState(user?.profile || {});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm(user?.profile || {});
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put('/users/profile', { profile: form });
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      navigate('/login');
    }
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-info">
          <div className="profile-section">
            <h2>Account Information</h2>
            <div className="profile-field">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{user.name}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Email:</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-field">
              <span className="profile-label">Member Since:</span>
              <span className="profile-value">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="profile-section">
            <h2>Academic Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Student ID</label>
                <input 
                  name="studentId" 
                  className="form-input" 
                  value={form.studentId || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">University</label>
                <input 
                  name="university" 
                  className="form-input" 
                  value={form.university || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input 
                  name="year" 
                  className="form-input" 
                  value={form.year || ''} 
                  onChange={handleChange} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Major</label>
                <input 
                  name="major" 
                  className="form-input" 
                  value={form.major || ''} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="profile-actions">
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          <div className="profile-section">
            <h2>Study Preferences</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Preferred Study Time</label>
                <select 
                  name="studyPreferences.preferredStudyTime" 
                  className="form-select" 
                  value={form.studyPreferences?.preferredStudyTime || ''} 
                  onChange={e => setForm({ 
                    ...form, 
                    studyPreferences: { 
                      ...form.studyPreferences, 
                      preferredStudyTime: e.target.value 
                    } 
                  })}
                >
                  <option value="">Select</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Session Duration (minutes)</label>
                <input 
                  type="number" 
                  name="studyPreferences.sessionDuration" 
                  className="form-input" 
                  value={form.studyPreferences?.sessionDuration || ''} 
                  onChange={e => setForm({ 
                    ...form, 
                    studyPreferences: { 
                      ...form.studyPreferences, 
                      sessionDuration: e.target.value 
                    } 
                  })} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Break Duration (minutes)</label>
                <input 
                  type="number" 
                  name="studyPreferences.breakDuration" 
                  className="form-input" 
                  value={form.studyPreferences?.breakDuration || ''} 
                  onChange={e => setForm({ 
                    ...form, 
                    studyPreferences: { 
                      ...form.studyPreferences, 
                      breakDuration: e.target.value 
                    } 
                  })} 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty Level</label>
                <select 
                  name="studyPreferences.difficulty" 
                  className="form-select" 
                  value={form.studyPreferences?.difficulty || ''} 
                  onChange={e => setForm({ 
                    ...form, 
                    studyPreferences: { 
                      ...form.studyPreferences, 
                      difficulty: e.target.value 
                    } 
                  })}
                >
                  <option value="">Select</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Learning Style</label>
                <select 
                  name="studyPreferences.learningStyle" 
                  className="form-select" 
                  value={form.studyPreferences?.learningStyle || ''} 
                  onChange={e => setForm({ 
                    ...form, 
                    studyPreferences: { 
                      ...form.studyPreferences, 
                      learningStyle: e.target.value 
                    } 
                  })}
                >
                  <option value="">Select</option>
                  <option value="visual">Visual</option>
                  <option value="auditory">Auditory</option>
                  <option value="kinesthetic">Kinesthetic</option>
                  <option value="reading">Reading</option>
                </select>
              </div>
              
              <div className="profile-actions">
                <button type="submit" className="btn btn-primary">
                  Update Preferences
                </button>
              </div>
            </form>
          </div>

          {message && (
            <div className="message" style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              borderRadius: '0.5rem',
              backgroundColor: message.includes('successfully') ? '#d1fae5' : '#fee2e2',
              color: message.includes('successfully') ? '#065f46' : '#991b1b',
              border: `1px solid ${message.includes('successfully') ? '#10b981' : '#ef4444'}`
            }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 