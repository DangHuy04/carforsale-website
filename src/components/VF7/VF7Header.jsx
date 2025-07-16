import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DarkModeToggle } from '../common';
import './VF7Header.scss';

const VF7Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="vf7-header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-text">VF7</span>
        </div>
        
        <nav className="header-nav">
          <ul className="nav-menu">
            <li><a href="#pricing">Giá bán</a></li>
            <li><a href="#intro">Giới thiệu</a></li>
            <li><a href="#exterior">Ngoại thất</a></li>
            <li><a href="#interior">Nội thất</a></li>
            <li><a href="#features">Tính Năng</a></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Button type="primary" className="offer-btn">
            NHẬN ƯU ĐÃI
          </Button>
          <DarkModeToggle 
            isDarkMode={isDarkMode} 
            onToggle={onToggleDarkMode} 
          />
        </div>
      </div>
    </header>
  );
};

VF7Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired
};

export default VF7Header; 