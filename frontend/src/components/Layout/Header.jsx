import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const Header = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title-row">
          <div className="header-title-block">
            <h1 className="header-title">Academic Planner</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
          </div>
        </div>
        
        {user && (
          <div className="profile-avatar-container" ref={profileRef}>
            <div 
              className="profile-avatar"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="avatar-initials">
                {getInitials(user.name)}
              </div>
            </div>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-email">{user.email}</div>
                  {user.profile?.university && (
                    <div className="profile-university">{user.profile.university}</div>
                  )}
                </div>
                <div className="profile-actions">
                  <button 
                    className="profile-action-btn"
                    onClick={() => {
                      navigate('/profile');
                      setShowProfileMenu(false);
                    }}
                  >
                    <span className="action-icon">👤</span>
                    Profile
                  </button>
                  <button 
                    className="profile-action-btn"
                    onClick={() => {
                      navigate('/settings');
                      setShowProfileMenu(false);
                    }}
                  >
                    <span className="action-icon">⚙️</span>
                    Settings
                  </button>
                  <div className="profile-divider"></div>
                  <button 
                    className="profile-action-btn logout-btn"
                    onClick={handleLogout}
                  >
                    <span className="action-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 