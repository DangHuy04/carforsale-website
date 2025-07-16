import React from 'react';
import PropTypes from 'prop-types';
import './ContentWrapper.scss';

const ContentWrapper = ({ 
  children, 
  reverse = false, 
  alignItems = 'center',
  className = '' 
}) => {
  return (
    <div className={`content-wrapper ${reverse ? 'reverse' : ''} ${className}`} 
         style={{ alignItems }}>
      {children}
    </div>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch']),
  className: PropTypes.string
};

export default ContentWrapper; 