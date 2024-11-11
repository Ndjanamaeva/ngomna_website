// src/Header.js
import React, { useState } from 'react';
import './../../styles/header.css'; // Import CSS for styling
import logo  from './../assets/mainlogo.png';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="header">
        <button className="menu-icon" onClick={toggleSidebar}>
          ☰
        </button>
        <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '150px', width: '150px' }} />
        </Link>
        <h1>ADMIN DASHBOARD</h1>
        <li>
          <PersonIcon/>
        </li>
        <li>
          <NotificationsIcon/>
        </li>
        <li>
          <SettingsIcon/>
        </li>
      </header>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <div className="logo-container">
        <Link to="/">
            <img src={logo} alt="Logo" style={{ height: '150px', width: '150px' }} />
        </Link>
        </div>
        <ul>
          <li><a href="/pages">Pages</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/boxes">Boxes</a></li>
          <li><a href="/carousel">Carousel</a></li>
          <li><a href="/links">Links</a></li>
          <li><a href="/comments">Comments</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
