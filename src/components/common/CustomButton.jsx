import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './CustomButton.scss';

const CustomButton = ({ 
  children, 
  variant = 'primary', 
  size = 'large', 
  loading = false,
  fullWidth = false,
  gradient = false,
  rounded = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) => {
  const getButtonClass = () => {
    const baseClass = 'custom-btn';
    const variantClass = `${baseClass}--${variant}`;
    const sizeClass = `${baseClass}--${size}`;
    const widthClass = fullWidth ? `${baseClass}--full-width` : '';
    const gradientClass = gradient ? `${baseClass}--gradient` : '';
    const roundedClass = rounded ? `${baseClass}--rounded` : '';
    
    return `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${gradientClass} ${roundedClass} ${className}`.trim();
  };

  const getAntdType = () => {
    switch (variant) {
      case 'primary': return 'primary';
      case 'secondary': return 'default';
      case 'danger': return 'primary';
      case 'success': return 'primary';
      case 'ghost': return 'ghost';
      case 'link': return 'link';
      case 'text': return 'text';
      default: return 'default';
    }
  };

  const iconElement = icon && (
    <span className={`custom-btn__icon custom-btn__icon--${iconPosition}`}>
      {icon}
    </span>
  );

  return (
    <Button
      type={getAntdType()}
      size={size}
      loading={loading}
      className={getButtonClass()}
      {...props}
    >
      {iconPosition === 'left' && iconElement}
      <span className="custom-btn__content">{children}</span>
      {iconPosition === 'right' && iconElement}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'ghost', 'link', 'text']),
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gradient: PropTypes.bool,
  rounded: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string
};

export default CustomButton; 