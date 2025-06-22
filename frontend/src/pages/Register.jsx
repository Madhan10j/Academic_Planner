import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
import { Navigate, Link } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(form));
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title">Register</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input name="name" className="form-input" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input name="username" className="form-input" value={form.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input name="password" type="password" className="form-input" value={form.password} onChange={handleChange} required />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>Register</button>
          </div>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 