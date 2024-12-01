// Header.js
import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <a href="/">AQI Trends</a>
        </div>
        {/* <ul className="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul> */}
      </nav>
    </header>
  );
};

export default Header;
