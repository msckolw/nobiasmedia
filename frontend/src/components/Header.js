import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
// Import your logo here (uncomment after adding the logo file)
// import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Politics', path: '/category/politics' },
    { name: 'Sports', path: '/category/sports' },
    { name: 'Technology', path: '/category/technology' },
    { name: 'Business', path: '/category/business' },
    { name: 'Entertainment', path: '/category/entertainment' },
    { name: 'Health', path: '/category/health' },
    { name: 'Science', path: '/category/science' },
    { name: 'World', path: '/category/world' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-text">The NoBiasMedia</Link>
        </div>
        
        <button className="menu-btn" onClick={toggleMenu}>
          <span className="menu-icon">☰</span>
        </button>
        
        <div className="header-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="menu-overlay" onClick={toggleMenu}></div>
          <div className="dropdown-menu active">
            <div className="menu-header">
              <h3>Categories</h3>
              <button className="close-btn" onClick={toggleMenu}>×</button>
            </div>
            {categories.map((category) => (
              <div
                key={category.name}
                className="menu-item"
                onClick={() => handleCategoryClick(category.path)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </>
      )}
    </header>
  );
};

export default Header; 