import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => (
  <aside className="sidebar">
    <ul className="nav-menu">
      <li className="nav-item">
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/timetable" className="nav-link">Timetable</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/profile" className="nav-link">Profile</NavLink>
      </li>
    </ul>
  </aside>
);

export default Sidebar; 