import React from 'react';
import PropTypes from 'prop-types';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import './DarkModeToggle.scss';

const DarkModeToggle = ({ isDarkMode, onToggle, className = '' }) => {
  return (
    <div className={`dark-mode-toggle ${className}`} onClick={onToggle}>
      <div className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="toggle-circle">
          {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
        </div>
        <div className="toggle-icons">
          <SunOutlined className="sun-icon" />
          <MoonOutlined className="moon-icon" />
        </div>
      </div>
    </div>
  );
};

DarkModeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default DarkModeToggle; 