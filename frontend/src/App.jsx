import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { loadUser } from './store/slices/authSlice';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Timetable from './pages/Timetable';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        
        {isAuthenticated ? (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div className="main-content">
                    <Sidebar />
                    <div className="content">
                      <Dashboard />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/tasks"
              element={
                <>
                  <Header />
                  <div className="main-content">
                    <Sidebar />
                    <div className="content">
                      <Tasks />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/timetable"
              element={
                <>
                  <Header />
                  <div className="main-content">
                    <Sidebar />
                    <div className="content">
                      <Timetable />
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <div className="main-content">
                    <Sidebar />
                    <div className="content">
                      <Profile />
                    </div>
                  </div>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
