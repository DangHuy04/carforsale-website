import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './CustomInput.scss';

const { TextArea } = Input;

const CustomInput = ({ 
  name, 
  label, 
  placeholder, 
  type = 'text', 
  icon, 
  rules = [], 
  required = false,
  size = 'large',
  disabled = false,
  maxLength,
  showCount = false,
  rows,
  autoSize,
  variant = 'default',
  helpText,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  const defaultRules = required ? [{ required: true, message: `Vui lòng nhập ${label?.toLowerCase()}!` }] : [];
  
  // Add validation rules based on type
  if (type === 'email') {
    defaultRules.push({ type: 'email', message: 'Email không hợp lệ!' });
  }
  
  if (type === 'phone') {
    defaultRules.push({ 
      pattern: /^[0-9]{10,11}$/, 
      message: 'Số điện thoại không hợp lệ!' 
    });
  }

  const getInputClass = () => {
    const baseClass = 'custom-input';
    const variantClass = `${baseClass}--${variant}`;
    const focusClass = focused ? `${baseClass}--focused` : '';
    
    return `${baseClass} ${variantClass} ${focusClass} ${className}`.trim();
  };

  const getInputComponent = () => {
    switch (type) {
      case 'password':
        return (
          <Input.Password
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            maxLength={maxLength}
            className={getInputClass()}
            prefix={icon}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        );
      
      case 'textarea':
        return (
          <TextArea
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            maxLength={maxLength}
            showCount={showCount}
            rows={rows}
            autoSize={autoSize}
            className={getInputClass()}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            maxLength={maxLength}
            className={getInputClass()}
            prefix={icon}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        );
        
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            size={size}
            disabled={disabled}
            maxLength={maxLength}
            className={getInputClass()}
            prefix={icon}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
        );
    }
  };

  // If no form context, render standalone input
  if (!name) {
    return (
      <div className="custom-input-wrapper">
        {label && <label className="custom-input-label">{label}</label>}
        {getInputComponent()}
        {helpText && <div className="custom-input-help">{helpText}</div>}
      </div>
    );
  }

  return (
    <Form.Item 
      name={name} 
      label={label}
      rules={[...defaultRules, ...rules]}
      className="custom-form-item"
      help={helpText}
    >
      {getInputComponent()}
    </Form.Item>
  );
};

CustomInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'phone', 'textarea']),
  icon: PropTypes.node,
  rules: PropTypes.array,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  showCount: PropTypes.bool,
  rows: PropTypes.number,
  autoSize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  variant: PropTypes.oneOf(['default', 'filled', 'borderless']),
  helpText: PropTypes.string,
  className: PropTypes.string
};

export default CustomInput; 