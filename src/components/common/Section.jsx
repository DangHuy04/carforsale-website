import React from 'react';
import PropTypes from 'prop-types';
import './Section.scss';

const Section = ({ 
  className = '', 
  id = '', 
  children, 
  containerClass = 'container',
  background = 'default' 
}) => {
  return (
    <section 
      className={`section ${background} ${className}`}
      id={id}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  containerClass: PropTypes.string,
  background: PropTypes.oneOf(['default', 'primary', 'secondary', 'dark', 'light'])
};

export default Section; 