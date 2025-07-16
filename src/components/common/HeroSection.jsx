import React from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import './HeroSection.scss';

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundVideo, 
  backgroundImage, 
  buttons = [], 
  overlay = true,
  className = '' 
}) => {
  return (
    <div className={`hero-section ${className}`}>
      <div className="hero-content">
        <div className={`hero-overlay ${overlay ? 'with-overlay' : ''}`}>
          <Space direction="vertical" size="middle" className="hero-text">
            <h1 className="hero-title">{title}</h1>
            {subtitle && <h2 className="hero-subtitle">{subtitle}</h2>}
            {buttons.length > 0 && (
              <Space size="large" className="hero-buttons">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    type={button.type || 'primary'}
                    size={button.size || 'large'}
                    icon={button.icon}
                    className={`hero-button ${button.className || ''}`}
                    onClick={button.onClick}
                  >
                    {button.text}
                  </Button>
                ))}
              </Space>
            )}
          </Space>
        </div>
      </div>
      
      {backgroundVideo && (
        <div className="hero-video">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-video-element"
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
      {backgroundImage && !backgroundVideo && (
        <div 
          className="hero-background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
    </div>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundVideo: PropTypes.string,
  backgroundImage: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      size: PropTypes.string,
      icon: PropTypes.node,
      className: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
  overlay: PropTypes.bool,
  className: PropTypes.string
};

export default HeroSection; 